import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const ATTRIBUTE_NAME = 'id';
const HEADER_NAME = 'x-request-id';

export function requestId(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const id = request.get(HEADER_NAME) ?? uuidv4();

  response.set(HEADER_NAME, id);
  request[ATTRIBUTE_NAME] = id;

  next();
}
