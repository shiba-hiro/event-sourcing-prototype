import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Paper, Typography, Slider, Button,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';

interface Props {
  onSubmit: (param: {from: moment.Moment; to: moment.Moment; unit: number}) => void;
  disabled?: boolean;
}

const Form = ({ onSubmit, disabled = false }: Props): JSX.Element => {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState<moment.Moment | null>(moment().add(1, 'days'));
  const [toDate, setToDate] = useState<moment.Moment | null>(moment().add(3, 'days'));
  const [unit, setUnit] = useState<number>(1);
  const setFixedUnit = useCallback((event: Record<string, any>, value: number | number[]): void => {
    if (typeof value === 'number') {
      setUnit(value);
      return;
    }
    setUnit(value[0]);
  }, []);
  const unitValueText = useCallback((value: number): string => `luggage x ${value}`, []);
  const handleSubmit = useCallback(() => {
    onSubmit({
      from: (fromDate ?? moment().add(1, 'days')),
      to: (toDate ?? moment().add(3, 'days')),
      unit,
    });
  }, [fromDate, toDate, unit, onSubmit]);
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
            Reserve
        </Typography>
        <DatePicker
          id="Form-from-date"
          className={classes.dateInput}
          label="Reservation start date"
          value={fromDate}
          onChange={setFromDate}
        />
        <DatePicker
          id="Form-to-date"
          className={classes.dateInput}
          label="Reservation end date"
          value={toDate}
          onChange={setToDate}
        />
        <Typography id="Form-unit-TG" gutterBottom>Luggage unit</Typography>
        <Slider
          id="Form-unit"
          value={unit}
          onChangeCommitted={setFixedUnit}
          min={0}
          max={10}
          marks
          getAriaValueText={unitValueText}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="auto"
        />
        <div className={classes.buttonArea}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            disabled={disabled}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </main>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  dateInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 40,
    width: '60%',
    flex: 1,
  },
  unitInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 40,
    width: '60%',
    flex: 1,
  },
  buttonArea: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default Form;
export { Form };
