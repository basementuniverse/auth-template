import { FirebaseError } from '@firebase/util';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import database from '../database';
import EmailService from '../services/email.service';
import { User, UserError } from '../types';
import firebase from '../utilities/firebase';

export default class AuthController {
  public static async register(request: Request, response: Response) {
    if (request.user) {
      throw new UserError('You are already logged in.');
    }

    // Create user in firebase
    let firebaseUser: firebase.auth.UserRecord;
    try {
      firebaseUser = await firebase.auth().createUser({
        email: request.body.email,
        password: request.body.password,
        displayName: request.body.displayName,
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-exists'
      ) {
        throw new UserError('Email already exists.');
      }

      throw error;
    }

    // Create user in database
    const user = await database<User>('users')
      .insert({
        id: uuid(),
        createdAt: new Date(),
        firebaseUid: firebaseUser.uid,
        displayName: request.body.displayName,
      })
      .returning('*');

    // Send verification email
    await EmailService.sendVerificationEmail(request.body.email, user[0]);

    response.send(user);
  }

  public static async forgotPassword(request: Request, response: Response) {
    if (request.user) {
      throw new UserError('You are already logged in.');
    }

    // Get user from firebase
    let firebaseUser: firebase.auth.UserRecord | undefined = undefined;
    try {
      firebaseUser = await firebase.auth().getUserByEmail(request.body.email);
    } catch (error) {}

    if (firebaseUser) {
      // Get user from database
      const user = await database<User>('users')
        .select('users.*')
        .where('users.firebaseUid', firebaseUser.uid)
        .first();

      if (user) {
        // Send reset password email
        await EmailService.sendResetPasswordEmail(request.body.email, user);
      }
    }

    response.send();
  }
}
