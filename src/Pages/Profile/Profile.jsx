import React, { useEffect } from 'react'
import ProfileUserDetails from '../../Components/ProfileComponent/ProfileUserDetails'
import ReqUserPostPart from '../../Components/ProfileComponent/ReqUserPostPart'
import { useDispatch } from 'react-redux'
import { findUserByUserNameAction, getUserProfileAction } from '../../Redux/User/Action'
import { useParams } from 'react-router-dom'

const Profile = () => {

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const param = useParams();
  
  const username =param.username;
  console.log("param", username);
  
  useEffect(() => {
    if (username) {
      const data={
        jwt:token,
        username: username}
      dispatch(findUserByUserNameAction(data))
    }
  }, [username])

  return (
    <div className='px-20'>
      <div>
        <ProfileUserDetails />
      </div>
      <div>
        <ReqUserPostPart />
      </div>
    </div>
  )
}

export default Profile
