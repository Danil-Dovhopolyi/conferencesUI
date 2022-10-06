import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import Header from '../components/Header';
import Datepicker from '../components/Datepicker';
import Button from '@mui/material/Button';
import DropDownListCountry from '../components/DropDownListCountry';
import './CreateConference.scss';
import { Link } from 'react-router-dom';
import Coordinates from '../components/Coordinates';

export default function CreateConference() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="wrapper">
      <Header />
      <div className="create">
        <div className="form">
          <form className="form__create" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__title">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </div>
            <Datepicker />
            <DropDownListCountry />
            <Coordinates />

            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button type="submit" variant="contained">
                Save
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
