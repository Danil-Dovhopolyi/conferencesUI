import React from 'react';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import './FormStyles.scss';
import { Link } from 'react-router-dom';
import { useAddConferenceMutation } from '../redux';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { MenuItem, InputLabel, Select, FormControl } from '@material-ui/core';
import Map from '../components/Map';
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
export default function CreateConference() {
  const [addConference] = useAddConferenceMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      country: '',
      latitude: '',
      longitude: '',
    },
    onSubmit: async (values) => {
      await addConference({ ...values });
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
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                sx={{ width: '100%' }}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>

            <div className="coordinates" style={{ dispay: 'flex', gap: '3%' }}>
              <TextField
                id="longitude"
                label="Longitude"
                type="number"
                value={formik.values.longitude}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="latitude"
                label="Latitude"
                type="number"
                value={formik.values.latitude}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="country">
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="country"
                  label="Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
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
            </div>
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
          <Map
            draggable={true}
            longitude={formik.values.longitude}
            latitude={formik.values.latitude}
          />
        </div>
      </div>
    </div>
  );
}
