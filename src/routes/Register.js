import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-widgets/DatePicker';
import 'react-widgets/scss/styles.scss';

export default function Register() {
  const [value, setValue] = useState();

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            maxWidth: 500,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Register to continue.</Typography>
          </div>
          <div className="user__name d-flex gap-3">
            <TextField
              name="firstname"
              type="text"
              placeholder="Name"
              label="Firstname"
            />
            <TextField
              name="lastname"
              type="text"
              placeholder="Lastname"
              label="Lastname"
            />
          </div>
          <div className="user__pass d-flex gap-3">
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />
            <TextField
              name="password_confirmed"
              type="password"
              placeholder="Repeat password"
              label="Password"
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="div">
              <TextField
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                label="Email"
              />
            </div>
            <div className="div">
              <label class="JoyFormLabel-root css-q3uzpg-JoyFormLabel-root">
                Phone
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                inputStyle={{ width: '87%', height: '40px' }}
              />
            </div>
          </div>
          <div className="div">
            <DatePicker placeholder="birthdate" />
          </div>
          <div>
            <Select color="neutral" placeholder="Choose role" size="md">
              <Option value={2}>Conferee</Option>
              <Option value={3}>Listener</Option>
            </Select>
          </div>
          <div>
            <Select color="neutral" placeholder="Choose country" size="md">
              <Option value={'Ukraine'}>Ukraine</Option>
              <Option value={'USA'}>USA</Option>
              <Option value={'Poland'}>Poland</Option>
              <Option value={'France'}>France</Option>
            </Select>
          </div>
          <Button
            sx={{
              mt: 1, // margin top
            }}
          >
            Register
          </Button>
          <Typography
            endDecorator={<Link href="/login">Login</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Do have account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
