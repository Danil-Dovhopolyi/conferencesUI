import React from 'react';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import '../FormStyles.scss';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

export default function CreateReport() {
  const formik = useFormik({
    initialValues: {
      topic: '',
      description: '',
      dateStart: null,
      dateEnd: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="wrapper">
      <Header />
      <div className="report">
        <div className="form">
          <form className="form__create" onSubmit={formik.handleSubmit}>
            <div className="form__title">
              <TextField
                id="topic"
                name="topic"
                label="Topic"
                variant="outlined"
                sx={{ width: '100%' }}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
            <div
              className="timereport"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                gap: '2%',
              }}
            >
              <Box width="auto" mb={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    style={{ width: 'auto' }}
                    id="dateStart"
                    label="Start report"
                    inputVariant="outlined"
                    format="HH:mm:ss"
                    value={formik.values.dateStart}
                    onChange={(value) =>
                      formik.setFieldValue('dateStart', value)
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <Box width="auto" mb={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    id="dateEnd"
                    label="End report"
                    inputVariant="outlined"
                    format="HH:mm:ss"
                    value={formik.values.dateEnd}
                    onChange={(value) => formik.setFieldValue('dateEnd', value)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </div>
            <TextareaAutosize
              style={{ width: '100%' }}
              id="description"
              label="Description"
              type="textarea"
              value={formik.values.description}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
