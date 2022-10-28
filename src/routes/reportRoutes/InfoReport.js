import React, { useContext, useState } from 'react';
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
import { Link } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { AuthContext } from '../../hooks/useAuth';
import { useFormik } from 'formik';
import { TextEditor } from '../../components/TextEditor';

export default function InfoReport() {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const { data, isLoading } = useGetReportByIdQuery(id);
  const { user } = useContext(AuthContext);
  const [deleteReport] = useDeleteReportMutation(id);

  const handleDeleteReport = async (id) => {
    await deleteReport(id);
  };

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values);
    },
  });
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="info">
          <div className="form-report">
            <form className="form__info" onSubmit={formik.handleSubmit}>
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
              {user.user.id === data.creator_id ? (
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
              ) : (
                ''
              )}
            </form>
          </div>
        </div>
        <div className="comments">
          <p>All Comments</p>
        </div>
        <div
          className="post-comment"
          style={{
            width: '80%',
            margin: '0 auto',
            marginBottom: '5%',
          }}
        >
          <p>Write your comment</p>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
          >
            <div className="editor" style={{ padding: '2%' }}>
              <TextEditor
                setFieldValue={(val) => formik.setFieldValue('message', val)}
                value={formik.values.message}
              />
            </div>
            <div
              className="buttons"
              style={{ display: 'flex', justifyContent: 'right', gap: '3%' }}
            >
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
