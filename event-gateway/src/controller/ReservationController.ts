import { Router, Request, Response } from 'express';
import uuid from 'uuid/v4';
import Logger from '../Logger';
import Firestore from '../Database';

const ReservationController: Router = Router();

ReservationController.post('/', (req: Request, res: Response) => {
  Logger.info('POST reservation endpoint is called');
  Logger.debug(`request body: ${JSON.stringify(req.body)}`);

  if (!req.body.from || !req.body.to || !req.body.unit) {
    res
      .status(400)
      .send({
        message: 'Request body is invalid',
      });
    return;
  }

  const eventId = uuid();
  const creation = Firestore
    .collection('reservation-creation-events')
    .doc(eventId)
    .set({
      from: req.body.from,
      to: req.body.to,
      unit: Number(req.body.unit),
      timestamp: Date.now(),
    });

  creation
    .then(() => {
      res
        .status(202)
        .send({
          eventId,
        });
    }).catch((error) => {
      Logger.error(error);
      res
        .status(500)
        .send({
          error,
        });
    });
});

export {
  ReservationController,
};
