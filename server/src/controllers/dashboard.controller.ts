import { Request, Response } from 'express';
import config from '../config';

export default class DashboardController {
  public static async index(request: Request, response: Response) {
    response.send({
      name: config.name,
      page: 'Dashboard',
    });
  }
}
