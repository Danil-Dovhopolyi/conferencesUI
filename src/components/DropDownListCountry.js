import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { countries } from '../mock/country';
export default function DropDownListCountry(conferenceCountry) {
  const [country, setCountry] = useState('');
  console.log(conferenceCountry);
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="form__country">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            defaultValue={{ value: conferenceCountry }}
            label="Country"
            onChange={handleChangeCountry}
          >
            {countries.map((country) => (
              <MenuItem value={country.name}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
