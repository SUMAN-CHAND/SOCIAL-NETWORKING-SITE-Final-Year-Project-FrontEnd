import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signupAction } from '../../Redux/Auth/Action';
import logo from '../../Img/111.png';


const validationShema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email Is Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password Is Required"),
})


export default function SignUp() {
  const initialValue = { email: "", username: "", name: "", password: "" };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();


  const { auth } = useSelector(store => store);

  const handleSubmit = (values,actions) => {
    // console.log("value", values);
    dispatch(signupAction(values));
    actions.setSubmitting(false);

  }

  // console.log(auth.signup)
  useEffect(()=>{
    if(auth.signup?.username){
      navigate('/login');
      toast({
        title: `Account created ${auth.signup?.username}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    }
  },[auth.signup])

  const handleNavigate = () => {
    navigate('/login');
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

                <Field name='username'>
                  {({ field, form }) => <FormControl isInvalid={form.errors.username && form.touched.username}>
                    <Input className='w-full' {...field} id="username"
                      placeholder='username'></Input>
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>}
                </Field>

                <Field name='name'>
                  {({ field, form }) => <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <Input className='w-full' {...field} id="name"
                      placeholder='Full Name'></Input>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                  Sign Up
                </Button>

              </Form>)}


          </Formik>

        </Box>
      </div>
      <div className='border w-full border-slate-300 mt-5'>
        <p className='text-center py-2 text-sm'>if You  Have Account Already<span className='ml-2 text-blue-700 cursor-pointer' onClick={handleNavigate}>Sing In?</span></p>
      </div>
    </div>
  )
}
