import { promises as fs } from 'fs';
import { render } from 'mustache';
import config from '../config';
import { User } from '../types';
import sendEmail from '../utilities/email';
import firebase from '../utilities/firebase';

export default class EmailService {
  public static async sendResetPasswordEmail(
    email: string,
    user: User
  ): Promise<void> {
    const template = await fs.readFile(
      config.email.templates.resetPassword,
      'utf-8'
    );
    const resetLink = await firebase.auth().generatePasswordResetLink(email);

    await sendEmail({
      to: email,
      subject: `${config.name} password reset`,
      text: render(template, {
        appName: config.name,
        displayName: user.displayName,
        email,
        resetLink,
      }),
    });
  }

  public static async sendVerificationEmail(
    email: string,
    user: User
  ): Promise<void> {
    const template = await fs.readFile(
      config.email.templates.verifyEmail,
      'utf-8'
    );
    const verifyLink = await firebase
      .auth()
      .generateEmailVerificationLink(email);

    await sendEmail({
      to: email,
      subject: `${config.name} email verification`,
      text: render(template, {
        appName: config.name,
        displayName: user.displayName,
        verifyLink,
      }),
    });
  }
}
