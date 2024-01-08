import { NextFunction, Request, Response } from 'express';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  response.once('finish', () => {
    console.log(
      `${new Date().toISOString()} ${request.id} ${request.method} ${
        request.path
      } ${response.statusCode}`
    );
  });

  next();
}
