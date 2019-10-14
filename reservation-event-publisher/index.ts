const publishReservationCreationEventToSource = (data: Record<string, any>, context: Record<string, any>) => {
  console.log('Newly created!!!');

  const triggerResource = context.resource;

  console.log(`Function triggered by change to: ${triggerResource}`);
  console.log(`Event type: ${context.eventType}`);

  if (data.oldValue && Object.keys(data.oldValue).length) {
    console.log('\nOld value:');
    console.log(JSON.stringify(data.oldValue, null, 2));
  }

  if (data.value && Object.keys(data.value).length) {
    console.log('\nNew value:');
    console.log(JSON.stringify(data.value, null, 2));
  }
};

export {
  publishReservationCreationEventToSource,
};
