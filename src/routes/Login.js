import React, { useContext } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Header from '../components/Header';
import { useFormik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../hooks/useAuth';
import { Navigate } from 'react-router';
import { useSanctum } from 'react-sanctum';
export default function Login() {
  //   onSubmit: (values, { resetForm }) => {
  //     axios
  //       .get('/sanctum/csrf-cookie')
  //       .then((response) => {
  //         console.log(response)
  //         axios
  //           .post('http://127.0.0.1:8000/api/login', {
  //             email: formik.values.email,
  //             password: formik.values.password,
  //           })
  //           .then((res) =>
  //             setUser((prevState) => ({
  //               ...res.data,
  //               isLoggin: true,
  //             }))
  //           )
  //           .catch((err) => console.log(err));
  //         resetForm();
  //       })
  //       .catch((err) => console.log('csrf: ' + err));
  //   },
  // });
  // const { authenticated, user, signIn } = useSanctum();
  const { user, setUser } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .get('http://127.0.0.1:8000/api/csrf-cookie')
        .then((response) => {
          console.log(response);
          axios
            .post('http://127.0.0.1:8000/api/login', {
              email: values.email,
              password: values.password,
            })
            .then((res) =>
              setUser((prevState) => ({
                ...res.data,
                isLoggin: true,
              }))
            );
        })
        .catch((err) => console.log('csrf: ' + err));
    },
  });

  const storage = localStorage.setItem('user', JSON.stringify(user));
  if (user) {
    return <Navigate replace to={'/'} />;
  }
  return (
    <>
      <Header />
      <CssVarsProvider>
        <main>
          <Sheet
            sx={{
              maxWidth: 400,
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
              <Typography level="body2">Sign in to continue.</Typography>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                label="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <TextField
                name="password"
                type="password"
                placeholder="password"
                label="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Button
                sx={{
                  mt: 1, // margin top
                }}
                type="submit"
              >
                Log in
              </Button>
              <Typography
                endDecorator={<Link href="/register">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                Don&apos;t have an account?
              </Typography>
            </form>
          </Sheet>
        </main>
      </CssVarsProvider>
    </>
  );
}
