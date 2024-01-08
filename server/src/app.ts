import { json } from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import 'express-async-errors';
import * as middleware from './middleware';
import * as routes from './routes';
import { UserError } from './types';

const app: Express = express();

app.use(json());
app.use(middleware.requestId);
app.use(middleware.logger);
app.use(cors());

app.use('/', routes.generalRouter);
app.use('/', routes.authRouter);
app.use(middleware.auth);
app.use('/dashboard', routes.dashboardRouter);

app.use(() => {
  throw new UserError('Not found', 404);
});

app.use(middleware.error);

export default app;
