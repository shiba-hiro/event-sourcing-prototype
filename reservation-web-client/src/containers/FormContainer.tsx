import React, { useCallback, useState } from 'react';
import firebase from 'firebase';

import { Form, SimpleToaster } from '../components';

const FormContainer: React.FC = () => {
  const [toasterState, setToasterState] = useState<{show: boolean; succeeded: boolean}>({ show: false, succeeded: false });

  const handleSubmit = useCallback(({ from, to, unit }) => {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.error('Need to sign in');
      setToasterState({
        show: true,
        succeeded: false,
      });
      return;
    }

    user
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) => fetch(`${process.env.REACT_APP_RESERVATION_API_HOST}/events/api/v1/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          from: from.format('YYYY-MM-DD'),
          to: to.format('YYYY-MM-DD'),
          unit,
        }),
      })).then((response) => {
        if (response.ok) {
          setToasterState({
            show: true,
            succeeded: true,
          });
          return;
        }
        throw new Error(`Request failed with ${response.status} ${response.statusText}`);
      }).catch((error) => {
        console.error(error);
        setToasterState({
          show: true,
          succeeded: false,
        });
      });
  }, []);

  const handleToasterClose = useCallback(() => {
    setToasterState({ show: false, succeeded: toasterState.succeeded });
  }, [toasterState]);

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <SimpleToaster
        show={toasterState.show}
        succeeded={toasterState.succeeded}
        handleClose={handleToasterClose}
      />
    </>
  );
};

export default FormContainer;
export { FormContainer };
