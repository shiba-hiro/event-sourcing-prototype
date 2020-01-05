import express from 'express';
import admin from 'firebase-admin';

import Logger from '../Logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const firebaseAdminServiceAccount = require(process.env.FIREBASE_ADMIN_KEY_FILENAME as string);
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminServiceAccount),
  databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com`,
});

const firebaseAuthMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const token = req.header('Authorization')?.split('Bearer ')[1];

  if (!token) {
    Logger.info('Authorization header does not have Bearer');
    res.sendStatus(401);
    return;
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      Logger.info(decodedToken);
      res.locals.user = decodedToken;
      next();
    }).catch((err) => {
      Logger.error(err);
      res.sendStatus(401);
    });
};

export default firebaseAuthMiddleware;
