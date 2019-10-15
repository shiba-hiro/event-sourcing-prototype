// import { Firestore } from '@google-cloud/firestore';

// const db = new Firestore({
//   projectId: process.env.PROJECT_ID,
//   keyFilename: process.env.KEY_FILENAME,
// });

const storeSubmittedReservation = (event: Record<string, any>): void => {
  try {
    const params = JSON.parse(Buffer.from(event.data, 'base64').toString());
    console.log(params);
    console.log(params.from);
    console.log(params.to);
    console.log(params.unit);
    console.log(params.reservationId);
  } catch (error) {
    console.error(error);
  }
};

export {
  storeSubmittedReservation,
};
