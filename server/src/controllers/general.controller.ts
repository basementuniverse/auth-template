import { Request, Response } from 'express';
import config from '../config';

export default class GeneralController {
  public static async index(request: Request, response: Response) {
    response.send({
      name: config.name,
      page: 'Home',
    });
  }
}
