import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import Header from '../components/Header';
import { useGetConferenceByIdQuery } from '../redux';
import { useUpdateConferenceMutation } from '../redux';
import Map from '../components/Map';
import './FormStyles.scss';

//Data

const countries = [
  {
    label: 'Ukraine',
    value: 'Ukraine',
  },
  {
    label: 'Germany',
    value: 'Germany',
  },
  {
    label: 'Sweden',
    value: 'Sweden',
  },
  {
    label: 'Poland',
    value: 'Poland',
  },
  {
    label: 'United',
    value: 'United Kingdom',
  },
];

const EditConference = () => {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const [updateConference, updateResult] = useUpdateConferenceMutation(id);
  console.log(updateResult);

  const onSubmit = async (values) => {
    await updateConference({ id, ...values });
  };

  const { data, isLoading } = useGetConferenceByIdQuery(id);
  if (isLoading) return <p>Loading...</p>;

  const initialValues = {
    title: data.title,
    country: data.country,
    longitude: data.longitude,
    latitude: data.latitude,
  };

  return (
    <>
      <Header />
      <Card style={{ margin: '2% auto', width: '80%' }}>
        <CardHeader title="EDIT FORM"></CardHeader>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ dirty, isValid, values, handleChange, handleBlur }) => {
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
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      sx={{ width: '100%' }}
                      value={values.title}
                      onChange={handleChange}
                    />

                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        name="country"
                      >
                        <MenuItem>None</MenuItem>
                        {countries.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div
                      className="coordinates"
                      style={{ dispay: 'flex', gap: '3%' }}
                    >
                      <TextField
                        id="longitude"
                        label="Longitude"
                        type="number"
                        value={values.longitude}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        id="latitude"
                        label="Latitude"
                        type="number"
                        value={values.latitude}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <CardActions>
                      <Button
                        disabled={!dirty || !isValid}
                        variant="contained"
                        color="primary"
                        type="Submit"
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </div>
                  <div className="edit-map">
                    <Map
                      draggable={true}
                      latitude={values.latitude}
                      longitude={values.longitude}
                    />
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

export default EditConference;
