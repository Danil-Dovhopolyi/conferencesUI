import React from 'react';
import { Box } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { TextField } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import { useDeleteReportMutation, useGetReportByIdQuery } from '../../redux';
import Header from '../../components/Header';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function InfoReport() {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const { data, isLoading } = useGetReportByIdQuery(id);
  const [deleteReport] = useDeleteReportMutation(id);
  const handleDeleteReport = async (id) => {
    await deleteReport(id);
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="info">
          <div className="form-report">
            <form className="form__info">
              <div className="form__title">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  disabled
                  value={data.topic}
                />
              </div>
              <div className="dates" style={{ display: 'flex', gap: '3%' }}>
                <div className="date-from">
                  <p>From</p>
                  <Box width="auto" mb={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        style={{ width: 'auto' }}
                        id="dateStart"
                        inputVariant="outlined"
                        format="HH:mm:ss"
                        value={data.dateStart}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                </div>
                <div className="date-to">
                  <p>To</p>
                  <Box width="auto" mb={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        style={{ width: 'auto' }}
                        id="dateEnd"
                        inputVariant="outlined"
                        format="HH:mm:ss"
                        value={data.dateEnd}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        disabled
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                </div>
              </div>
              <TextareaAutosize
                style={{ width: '100%' }}
                id="description"
                label="Description"
                type="textarea"
                value={data.description}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <div className="form__buttons">
                <Link to={`/report-edit/?id=${id}`} variant="contained">
                  <Button variant="contained">Edit</Button>
                </Link>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteReport(id)}
                >
                  Cancel participation
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
