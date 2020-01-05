import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { authUIConfig } from '../initializers/firebase';

const SigninForm = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <StyledFirebaseAuth uiConfig={authUIConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default SigninForm;
export { SigninForm };
