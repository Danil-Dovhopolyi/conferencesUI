import React, { useState } from 'react';
import Header from '../components/Header';
import { TextField } from '@mui/material';
import Datepicker from '../components/Phone';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './FormStyles.scss';
import { useGetConferenceByIdQuery } from '../redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { countries } from '../mock/country';
import { useFormik } from 'formik';
import { useUpdateConferenceMutation } from '../redux';
export default function EditConference() {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const [country, setCountry] = useState('');
  const [updateConference] = useUpdateConferenceMutation();

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      latitude: '',
      longitude: '',
      country: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { data, isLoading } = useGetConferenceByIdQuery(id);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="wrapper">
      <Header />
      <div className="edit">
        <div className="form">
          <form className="form__edit" onSubmit={formik.handleSubmit}>
            <div className="form__title">
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ width: '100%' }}
                defaultValue={data.title}
                onChange={formik.handleChange}
              />
            </div>
            <Datepicker />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={data.country}
                  label="Country"
                  SelectProps={{
                    renderValue: (country) => country,
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem value={country.name}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <div className="coordinates">
              <TextField
                id="outlined-number"
                label="Latitude"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={data.latitude}
                onChange={formik.handleChange}
              />
              <TextField
                id="outlined-number"
                label="Longitude"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={data.longitude}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button type="submit" variant="contained" color="warning">
                Edit
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
