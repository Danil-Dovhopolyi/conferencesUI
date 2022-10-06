import React from 'react';
import Header from '../components/Header';
import { TextField } from '@mui/material';
import Datepicker from '../components/Datepicker';
import Button from '@mui/material/Button';
import DropDownListCountry from '../components/DropDownListCountry';
import { Link } from 'react-router-dom';
import Coordinates from '../components/Coordinates';
import './FormStyles.scss';
export default function InfoConference() {
  return (
    <div className="wrapper">
      <Header />
      <div className="info">
        <div className="form">
          <form className="form__info">
            <div className="form__title">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{ width: '100%' }}
                disabled
              />
            </div>
            <Datepicker />
            <DropDownListCountry />
            <Coordinates />

            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button type="button" variant="contained" color="error">
                Delete
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
