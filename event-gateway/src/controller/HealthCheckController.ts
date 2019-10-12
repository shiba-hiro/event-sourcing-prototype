import { Router, Request, Response } from 'express';
import Logger from '../Logger';

const HealthCheckController: Router = Router();

HealthCheckController.get('/', async (req: Request, res: Response) => {
  Logger.info('health-check endpoint is called');

  const appState = {
    message: 'Application is running.',
    success: true,
  };

  res
    .status(200)
    .send({
      app: appState,
    });
});

export {
  HealthCheckController,
};
