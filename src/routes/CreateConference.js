import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import DropDownListCountry from '../components/DropDownListCountry';
import './FormStyles.scss';
import { Link } from 'react-router-dom';
import Coordinates from '../components/Coordinates';
import { useAddConferenceMutation } from '../redux';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
export default function CreateConference() {
  const [addConference] = useAddConferenceMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });
  return (
    <div className="wrapper">
      <Header />
      <div className="create">
        <div className="form">
          <form className="form__create" onSubmit={formik.handleSubmit}>
            <div className="form__title">
              <TextField
                id="outlined-basic"
                name="title"
                label="Title"
                variant="outlined"
                sx={{ width: '100%' }}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>

            {/* <Datepicker
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            /> */}

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
          </form>
        </div>
        <div className="map">
          <h1>MAP</h1>
        </div>
      </div>
    </div>
  );
}
