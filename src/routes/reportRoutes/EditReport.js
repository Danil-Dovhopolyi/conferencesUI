import React from 'react';
import { Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import Header from '../../components/Header';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import '../FormStyles.scss';
import {
  useGetReportByIdQuery,
  useUpdateReportMutation,
  useDeleteReportMutation,
} from '../../redux';
import { Box } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const EditReport = () => {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const [updateReport] = useUpdateReportMutation(id);
  const onSubmit = async (values) => {
    await updateReport({ id, ...values });
  };

  const [deleteReport] = useDeleteReportMutation(id);
  const handleDeleteReport = async (id) => {
    await deleteReport(id);
  };

  const { data, isLoading } = useGetReportByIdQuery(id);
  if (isLoading) return <p>Loading...</p>;

  const initialValues = {
    topic: data.topic,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    description: data.description,
  };

  return (
    <>
      <Header />
      <Card style={{ margin: '2% auto', width: '80%' }}>
        <CardHeader title="EDIT FORM"></CardHeader>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            dirty,
            isValid,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => {
            return (
              <Form className="form__edit">
                <CardContent
                  className="content"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <div
                    className="edit"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '45%',
                    }}
                  >
                    <TextField
                      id="topic"
                      name="topic"
                      label="Topic"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      value={values.topic}
                      onChange={handleChange}
                    />
                    <div
                      className="dates"
                      style={{ display: 'flex', gap: '3%' }}
                    >
                      <div className="date-from">
                        <p>From</p>
                        <Box width="auto" mb={2}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                              style={{ width: 'auto' }}
                              id="dateStart"
                              inputVariant="outlined"
                              format="HH:mm:ss"
                              value={values.dateStart}
                              onChange={(value) =>
                                setFieldValue('dateStart', value)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
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
                              value={values.dateEnd}
                              onChange={(value) =>
                                setFieldValue('dateEnd', value)
                              }
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
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
                      value={values.description}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <CardActions>
                      <Button
                        disabled={!dirty || !isValid}
                        variant="contained"
                        color="primary"
                        type="Submit"
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteReport(id)}
                      >
                        Cancel participation
                      </Button>
                    </CardActions>
                  </div>
                </CardContent>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};

export default EditReport;
