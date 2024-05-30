import React from 'react'
import SuggetionCard from './SuggetionCard'
import { useSelector } from 'react-redux'

export default function HomeRight() {

  const {user} = useSelector(store=>store);

  return (
    <div className=''>

      <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div>
              <img className='h-12 w-12 rounded-full' src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
            </div>
            <div className='ml-3'>
              <p>{user?.reqUser?.name}</p>
              <p className='opacity-70'>{user?.reqUser?.username}</p>
            </div>
          </div>
          <div>
            <p className='text-blue-700 text-sm font-bold'>Switch</p>
          </div>
        </div>
        <div className='space-y-5 mt-10'>
          {user.populerUser?.slice(0,7).map((item) => <SuggetionCard  suggestdUser={item}/>)}
        </div>
      </div>
    </div>
  )
}
