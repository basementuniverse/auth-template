import nodemailer, { SentMessageInfo } from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

export default async function sendEmail(
  options: nodemailer.SendMailOptions
): Promise<SentMessageInfo> {
  return await transporter.sendMail({
    from: `"${config.email.fromName}" <${config.email.fromAddress}>`,
    ...options,
  });
}
