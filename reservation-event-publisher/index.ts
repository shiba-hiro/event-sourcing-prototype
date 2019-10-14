import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub({
  projectId: process.env.PROJECT_ID,
});
const topicName = `projects/${process.env.PROJECT_ID}/topics/reservation-creation-events`;

const publishReservationCreationEventToSource = (data: Record<string, any>, context: Record<string, any>) => {
  const triggerResource = context.resource;

  console.log(`Function triggered by change to: ${triggerResource}`);
  console.log(`Event type: ${context.eventType}`);

  pubsub.topic(topicName)
    .publishJSON({ ...data.value.fields })
    .then((messageId) => {
      console.log(`Message ${messageId} published.`);
    }).catch((error) => {
      console.error(`Publish failed: ${error}`);
    });
};

export {
  publishReservationCreationEventToSource,
};
