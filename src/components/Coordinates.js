import React from 'react';
import { TextField } from '@mui/material';
export default function Coordinates() {
  return (
    <div className="coordinates">
      <TextField
        id="outlined-number"
        label="Latitude"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number"
        label="Longitude"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
