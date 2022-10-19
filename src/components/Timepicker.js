import React from 'react';
import ReactDOM from 'react-dom';

// --- Formik  imports --- //
import { Formik, Form } from 'formik';

// --- Material Ui Imports --- //
import { Typography, Container, Button, Box } from '@material-ui/core';

// --- Material Ui Picker Imports --- //
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

// --- Yup Imports --- //
import * as yup from 'yup';

// --- Custom Imports --- //
import { DisplayFormikProps } from './DisplayFormikProps';

// --- Form Schema --- //
var formSchema = {
  dateStart: null, // if date is defiend as '' yup will throw a invalid date error
};

// --- Validation Schema --- //
var validationSchema = yup.object().shape({
  date: yup.date().nullable(),
});

function SecondsTimePicker() {
  return (
    <Container>
      <Formik
        initialValues={formSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
        render={(props) => (
          <Form>
            <Box width="100%" mb={2}>
              {/* Material Ui Date Picker */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  inputVariant="outlined"
                  format="HH:mm:ss"
                  value={props.values.dateStart}
                  onChange={(value) => props.setFieldValue('dateStart', value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Box width="100%" my={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      />
    </Container>
  );
}
export default SecondsTimePicker;
