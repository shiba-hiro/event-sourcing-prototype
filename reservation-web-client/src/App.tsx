import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { FormContainer } from './containers';

const App: React.FC = () => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <FormContainer />
  </MuiPickersUtilsProvider>
);

export default App;
