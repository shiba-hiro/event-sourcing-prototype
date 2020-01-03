import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

interface Props {
  show: boolean;
  succeeded: boolean;
  handleClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void;
}

const SimpleToaster = ({ show, succeeded, handleClose }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={5000}
      open={show}
      onClose={handleClose}
    >
      <SnackbarContent
        className={succeeded ? classes.success : classes.error}
        aria-describedby="message-id"
        message={(
          <span id="message-id">
            {succeeded ? 'Request Succeeded!' : 'Request Failed!'}
          </span>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default SimpleToaster;
export { SimpleToaster };
