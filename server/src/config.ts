import tryRequire from '@basementuniverse/try-require';
import dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'local';

dotenv.config({
  path: `.env.${env}`,
});

const config = {
  env,
  name: process.env.NAME || 'Auth Template',
  port: Number(process.env.PORT) || 8000,
  url: process.env.URL || '',
  appUrl: process.env.APP_URL || '',
  database: {
    client: process.env.DATABASE_CLIENT || '',
    path: process.env.DATABASE_PATH || '',
  },
  firebase: tryRequire(path.join(__dirname, '../firebase.json')),
  email: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    username: process.env.SMTP_USERNAME || '',
    password: process.env.SMTP_PASSWORD || '',
    fromName: process.env.EMAIL_FROM_NAME || '',
    fromAddress: process.env.EMAIL_FROM_ADDRESS || '',
    templates: {
      resetPassword: path.join(__dirname, './emails/reset-password.mustache'),
      verifyEmail: path.join(__dirname, './emails/verify-email.mustache'),
    },
  },
};

export default config;
