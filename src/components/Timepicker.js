import React from 'react';

import { Formik, Form } from 'formik';

import { Container, Button, Box } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

var formSchema = {
  dateStart: null,
};

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
