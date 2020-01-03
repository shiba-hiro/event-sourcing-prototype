import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Slider, Button } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

interface Props {
  onSubmit: (param: {from: moment.Moment; to: moment.Moment; unit: number}) => void;
}

const Form = ({ onSubmit }: Props): JSX.Element => {
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
    <div className={classes.Form}>
      <DateTimePicker
        id="Form-from-date"
        className={classes.FormDateTimeInput}
        label="Reservation start date"
        value={fromDate}
        onChange={setFromDate}
      />
      <DateTimePicker
        id="Form-to-date"
        className={classes.FormDateTimeInput}
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
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="auto"
      />
      <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  Form: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  FormDateTimeInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 40,
    width: '60%',
    flex: 1,
  },
  FormUnitInput: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 40,
    width: '60%',
    flex: 1,
  },
}));

export default Form;
export { Form };
