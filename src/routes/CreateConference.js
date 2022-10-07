import React from 'react';
// import { TextField } from '@mui/material';
import Header from '../components/Header';
import Datepicker from '../components/Datepicker';
import Button from '@mui/material/Button';
import DropDownListCountry from '../components/DropDownListCountry';
import './FormStyles.scss';
import { Link } from 'react-router-dom';
import Coordinates from '../components/Coordinates';
import { useAddConferenceMutation } from '../redux';
import { useFormik, Field, Form } from 'formik';
import { TextField } from 'formik-mui';

export default function CreateConference() {
  const [addConference] = useAddConferenceMutation();

  return (
    <div className="wrapper">
      <Header />
      <div className="create">
        <div className="form">
          <Form className="form__create">
            <div className="form__title">
              <Field
                id="outlined-basic"
                name="title"
                label="Title"
                variant="outlined"
                sx={{ width: '100%' }}
                component={TextField}
              />
            </div>

            <Datepicker name="date" />

            <DropDownListCountry name="country" />

            <Coordinates />
            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </div>
          </Form>
        </div>
        <div className="map">
          <h1>MAP</h1>
        </div>
      </div>
    </div>
  );
}
