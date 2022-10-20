import React from 'react';
import Header from '../components/Header';
import { TextField } from '@mui/material';
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
import { useDeleteConferenceMutation } from '../redux';
import Map from '../components/Map';

export default function InfoConference() {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const [deleteConferences] = useDeleteConferenceMutation(id);
  const handleDeleteConferences = async (id) => {
    await deleteConferences(id);
  };
  const { data, isLoading } = useGetConferenceByIdQuery(id);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="wrapper">
      <Header />
      <div className="info">
        <div className="form">
          <form className="form__info">
            <div className="form__title">
              <TextField
                id="outlined-basic"
                variant="outlined"
                sx={{ width: '100%' }}
                disabled
                value={data.title}
              />
            </div>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.country}
                  label="Country"
                  disabled
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
                value={data.latitude}
                disabled
              />
              <TextField
                id="outlined-number"
                label="Longitude"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.longitude}
                disabled
              />
            </div>

            <div className="form__buttons">
              <Link to={'/'} variant="contained">
                <Button variant="contained">Back</Button>
              </Link>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={() => handleDeleteConferences(id)}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
        <div className="map">
          <Map
            longitude={data.longitude}
            latitude={data.latitude}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
