import React, { useContext, useEffect } from 'react';
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
import Header from '../../components/Header';
import { AuthContext } from '../../hooks/useAuth';
import { useUpdateUserMutation, useGetCurrentUserQuery } from '../../redux';
const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

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

//password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{6,})/;

//validation schema
let validationSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
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

const ProfileEdit = () => {
  const params = new URL(document.location.href).searchParams;
  const id = params.get('id'); // "1"
  const classes = useStyle();
  const [userUpdate] = useUpdateUserMutation(id);
  const { user, setUser } = useContext(AuthContext);
  //Data
  const initialValues = {
    firstname: user.user.firstname,
    lastname: user.user.lastname,
    country: user.user.country,
    email: user.user.email,
    password: user.user.password,
    password_confirmation: '',
  };

  const onSubmit = async (values) => {
    await userUpdate({ id, ...values });
  };

  return (
    <>
      <Header />
      <Grid container justify="center" spacing={1}>
        <Grid item md={6}>
          <Card className={classes.padding}>
            <CardHeader title="PROFILE EDIT FORM"></CardHeader>
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
                            name="firstname"
                            value={values.firstname}
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Field
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            name="lastname"
                            value={values.lastname}
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

export default ProfileEdit;
