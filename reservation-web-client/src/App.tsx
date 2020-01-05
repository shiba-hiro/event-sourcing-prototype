import React, {
  useEffect, useState, useCallback,
} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import firebase from 'firebase';

import { FormContainer } from './containers';
import { SimpleHeader, SigninForm } from './components';

const Content = (props: {isAuthStateLoading: boolean; isSignedIn: boolean}): JSX.Element => {
  const { isAuthStateLoading, isSignedIn } = props;
  if (isAuthStateLoading) return (<></>);
  return isSignedIn ? <FormContainer /> : <SigninForm />;
};

const App: React.FC = () => {
  const [isAuthStateLoading, setAuthStateLoading] = useState<boolean>(true);
  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(
        (user) => {
          setSignedIn(!!user);
          setAuthStateLoading(false);
        },
        (error) => {
          console.error(error);
          setAuthStateLoading(false);
        },
      );
    return (): void => {
      unregisterAuthObserver();
    };
  }, []);

  const handleSignOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SimpleHeader showSignOut={!isAuthStateLoading && isSignedIn} onSignOut={handleSignOut} />
        <Content isAuthStateLoading={isAuthStateLoading} isSignedIn={isSignedIn} />
      </MuiPickersUtilsProvider>
    </>
  );
};


export default App;
