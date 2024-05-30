import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signinAction } from '../../Redux/Auth/Action';
import { useEffect } from 'react';
import { getUserProfileAction } from '../../Redux/User/Action';
import logo from '../../Img/111.png';


const validationShema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Is Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password Is Required"),
})

export default function SignIn() {
  const initialValue = { email: "", password: "" };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store);
  const jwt = localStorage.getItem("token");

  const handleSubmit = (values, actions) => {
    dispatch(signinAction(values))
    actions.setSubmitting(false);

  }
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfileAction(jwt))
    }
  }, [jwt])
  useEffect(() => {
    if (user.reqUser?.username) {
      navigate(`/${user.reqUser?.username}`);
    }
  }, [jwt, user.reqUser])



  const handleNavigate = () => {
    navigate('/signup');
  }

  return (
    <div>
      <div className='border'>
        <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          {/* <img className='mb-5' src="https://i.imgur.com/zqpwkLQ.png" alt="" /> */}
          <img className='mb-5' src={logo} alt="" />

          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={validationShema}
          >
            {(formikprops) => (
              <Form className='space-y-8'>
                <Field name='email'>
                  {({ field, form }) => <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <Input className='w-full' {...field} id="email"
                      placeholder='Moblie Number or Email'></Input>
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>}
                </Field>
                <Field name='password'>
                  {({ field, form }) => <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <Input className='w-full' {...field} id="password"
                      placeholder='Password'></Input>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>}
                </Field>


                <p className='text-center text-sm'>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                <p className='text-center text-sm'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formikprops.isSubmitting}>
                  Sign In
                </Button>

              </Form>)}


          </Formik>

        </Box>
      </div>
      <div className='border w-full border-slate-300 mt-5'>
        <p className='text-center py-2 text-sm'>if You Don't Have Account <span className='ml-2 text-blue-700 cursor-pointer' onClick={handleNavigate}>Sing Up?</span></p>
      </div>
    </div>
  )
}
