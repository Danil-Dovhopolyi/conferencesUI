import React, { useContext } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import Header from '../components/Header';
import { AuthContext } from '../hooks/useAuth';
import axios from 'axios';
import { Navigate } from 'react-router';
import { useCookies } from 'react-cookie';
const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

//Data
const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
};

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
const roles = [
  {
    label: 'Conferee',
    value: 'conferee',
  },
  {
    label: 'Listener',
    value: 'listener',
  },
];

//password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

//validation schema
let validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      'Must contain one lowercase alphabetical character!'
    )
    .matches(
      uppercaseRegEx,
      'Must contain one uppercase alphabetical character!'
    )
    .matches(numericRegEx, 'Must contain one numeric character!')
    .matches(lengthRegEx, 'Must contain 6 characters!')
    .required('Required!'),
});

const Register = () => {
  const { user, setUser } = useContext(AuthContext);
  const classes = useStyle();
  const [cookies, setCookie] = useCookies(['token']);
  const onSubmit = (values, { resetForm }) => {
    axios
      .get('http://127.0.0.1:8000/api/csrf-cookie', { withCredentials: true })
      .then(() => {
        axios
          .post('http://127.0.0.1:8000/api/register', {
            headers: {
              'Content-Type': 'application/json',
            },
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            country: values.country,
            role: values.role,
          })
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              setUser((prevState) => ({
                ...response.data,
                isLoggin: true,
              }));
              setCookie('token', response.data.token, { path: '/' });
            }
            resetForm();
          });
      });
  };

  localStorage.setItem('user', JSON.stringify(user));
  if (user) {
    return <Navigate replace to={'/'} />;
  }
  return (
    <>
      <Header />
      <Grid container justify="center" spacing={1}>
        <Grid item md={6}>
          <Card className={classes.padding}>
            <CardHeader title="REGISTER FORM"></CardHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ dirty, isValid, values, handleChange, handleBlur }) => {
                return (
                  <Form>
                    <CardContent>
                      <Grid item container spacing={1} justify="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            name="firstName"
                            value={values.firstName}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastName"
                            value={values.lastName}
                            component={TextField}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Country
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="Country"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.country}
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
                        </Grid>

                        <Grid item xs={12} sm={6} md={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Role
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="role"
                              label="role"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.role}
                              name="role"
                            >
                              <MenuItem>None</MenuItem>
                              {roles.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={values.email}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={values.password}
                            type="password"
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Repeat Password"
                            variant="outlined"
                            fullWidth
                            name="password_confirmation"
                            value={values.password_confirmation}
                            type="password"
                            component={TextField}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!dirty || !isValid}
                        variant="contained"
                        color="primary"
                        type="Submit"
                        className={classes.button}
                      >
                        REGISTER
                      </Button>
                    </CardActions>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
