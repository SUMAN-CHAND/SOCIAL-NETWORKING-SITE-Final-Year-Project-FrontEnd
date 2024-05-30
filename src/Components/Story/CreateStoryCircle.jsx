import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa";
import CreateStoryModal from './CreateStoryModal';
import { useDisclosure } from '@chakra-ui/react';


export default function CreateStoryCircle({ user }) {
    // const navigate = useNavigate();
    // const handleNavigate = () => {
    //     navigate(`/story/${user.id}`)
    // }
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div onClick={onOpen} className='cursor-pointer flex flex-col items-center'>
            <div class="grid place-items-center" >
                <img className='w-16 h-16 rounded-full' style={{marginBottom:'-47px'}} src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                <FaPlus className='w-8 h-8 text-white'  />
            </div>

            <p style={{marginTop:'15px'}}>{user?.username}</p>
            <CreateStoryModal onClose={onClose} isOpen={isOpen} onOpen={onOpen}/>

        </div>
    )
}
