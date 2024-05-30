import React from 'react'
import "./Auth.css"
import SignIn from '../../Components/Register/SignIn';
import { useLocation } from 'react-router-dom';
import SignUp from '../../Components/Register/SignUp';
export default function Auth() {
  const location = useLocation();
  return (
    <div>
      <div className='flex items-center justify-center h-[100vh] space-x-5'>
        <div className='relative hidden lg:block'>
          <div className='h[35.3rem] w-[28rem]'>
            {/* <img className='h-full w-full' src="https://res.cloudinary.com/dnbw04gbs/image/upload/v1679494375/home-phones-2x-edited_glksxn.png" alt="" /> */}
            <img className='h-full w-full' src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk" alt="" />
            {/* <img className='h-full w-full' src="https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot4.png" alt="" /> */}
            <div className='mobilexallpaper h-[33rem] w-[15.7rem] absolute top-6 right-12'>

            </div>
          </div>
        </div>
          <div className='w-[40vw] lg:w-[23vw]'>
            {location.pathname==="/login" ? <SignIn />:<SignUp/>}
           
          </div>
      </div>
    </div>
  )
}
