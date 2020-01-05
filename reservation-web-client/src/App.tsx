import React, { useEffect, useState } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { authUIConfig } from './initializers/firebase';
import { FormContainer } from './containers';

const App: React.FC = () => {
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(
        (user) => setSignedIn(!!user),
      );
    return (): void => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <h1>Event Source Prototype App</h1>
      {isSignedIn
        ? <FormContainer />
        : <StyledFirebaseAuth uiConfig={authUIConfig} firebaseAuth={firebase.auth()} />}
    </MuiPickersUtilsProvider>
  );
};


export default App;
