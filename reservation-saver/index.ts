import { Firestore } from '@google-cloud/firestore';

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_FILENAME,
});

interface EventParameter {
  reservationId: {stringValue: string};
  from: {stringValue: string};
  to: {stringValue: string};
  unit: {integerValue: string};
  timestamp: {integerValue: string};
}

const storeSubmittedReservation = (event: Record<string, any>): Promise<void> => {
  const params = JSON.parse(Buffer.from(event.data, 'base64').toString()) as EventParameter;

  return db
    .collection('reservations')
    .doc(params.reservationId.stringValue)
    .set({
      from: params.from.stringValue,
      to: params.to.stringValue,
      unit: Number(params.unit.integerValue),
      createdAt: Number(params.timestamp.integerValue),
      status: 'isSubmitting',
      creationValidations: {
        reservation: 'passed',
      },
    }).then(() => {
      console.log(`Successfully stored the reservation: ${params.reservationId.stringValue}`);
    })
    .catch((error) => {
      console.error(`Failed to store the reservation: ${params.reservationId.stringValue}`);
      console.error(error);
      throw error;
    });
};

export {
  storeSubmittedReservation,
};
