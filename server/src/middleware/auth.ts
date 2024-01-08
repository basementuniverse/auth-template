import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import * as constants from '../constants';
import database from '../database';
import { User, UserError } from '../types';
import firebase from '../utilities/firebase';

export async function auth(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  let user: User | undefined;
  const token = request.headers[constants.HEADER_AUTH_TOKEN]?.toString() ?? '';

  // If no auth token is specified, the user is not authorized
  if (!token) {
    throw new UserError('Authentication required', 401);
  }

  // Verify token
  let firebaseToken: firebase.auth.DecodedIdToken;
  try {
    firebaseToken = await firebase.auth().verifyIdToken(token);
  } catch (error) {
    throw new UserError('Invalid authentication token', 401);
  }

  // Get user from database
  user = await database<User>('users')
    .select('users.*')
    .where('users.firebaseUid', firebaseToken.uid)
    .first();

  // If the user doesn't exist, create one now
  if (!user) {
    // Get user data from firebase
    const firebaseUser = await firebase
      .auth()
      .getUser(firebaseToken.uid)
      .catch(() => {
        throw new UserError('Invalid authentication token', 401);
      });

    // Add a new user in the database
    [user] = await database<User>('users')
      .insert({
        id: uuid(),
        createdAt: new Date(),
        firebaseUid: firebaseToken.uid,
        displayName: firebaseUser.displayName,
      })
      .returning('*');
  }

  request.user = user;

  next();
}
