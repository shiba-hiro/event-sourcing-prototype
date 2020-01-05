import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

interface Props {
  showSignOut?: boolean;
  onSignOut?: () => void;
}

const SimpleHeader = ({ showSignOut = false, onSignOut }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            Event Source Prototype App
          </Typography>
          {showSignOut ? <Button color="inherit" onClick={onSignOut}>Sign Out</Button> : <></> }
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles(() => createStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    flexGrow: 1,
  },
}));

export default SimpleHeader;
export { SimpleHeader };
