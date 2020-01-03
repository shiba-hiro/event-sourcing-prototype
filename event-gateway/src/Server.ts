import express from 'express';

import Logger from './Logger';
import { HealthCheckController, ReservationController } from './controller';

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(express.json());
app.use('/events/api/v1/health-check', HealthCheckController);
app.use('/events/api/v1/reservations', ReservationController);
app.use((err: Error, req: express.Request, res: express.Response) => {
  Logger.error(err);
  res.status(500).end();
});

app.listen(port, () => {
  Logger.info(`Listening at http://localhost:${port}/`);
});
