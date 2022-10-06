import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { countries } from '../mock/country';
export default function DropDownListCountry() {
  const [country, setCountry] = useState('');

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
