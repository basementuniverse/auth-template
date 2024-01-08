import { NextFunction, Request, Response } from 'express';
import { UserError } from '../types';

export function error(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  console.error(error);

  if (error instanceof UserError) {
    const { status, message, attachments } = error;
    return response.status(status).send({
      message,
      attachments,
    });
  }

  return response.status(500).json({
    message: 'An error occurred',
  });
}
