import { Button, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import './CreatePostModal.css'
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../Redux/Post/Action';
import { UploadToCloudnary } from '../../Config/UploadToCloudnary';



export default function CreatPostModal({ onClose, onOpen, isOpen }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const [imgaeUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    const { user } = useSelector(store => store);


    const jwt = localStorage.getItem("token");

    const handleDrop = (event) => {
        event.preventDefalult();
        const droppedFile = event.dataTransfer.file[0];
        if (droppedFile.type.startWith("image/") || droppedFile.type.startWith("video/")) {
            setFile(droppedFile);
        }
    }
    const handleDragOver = (event) => {
        event.preventDefalult();
        event.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    }
    const handleDragLeave = () => {
        setIsDragOver(false);
    }
    const handleOnChange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
            const imaUrl = await UploadToCloudnary(file);
            setImageUrl(imaUrl);
            setFile(file);
            console.log("file :", file)
        } else {
            setFile(null);
            alert("please select an image or video");
        }

    }
    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    }
    const handleCreatePost = () => {
        const data = {
            jwt: jwt,
            data: {
                caption, location, image: imgaeUrl
            }
        }
        dispatch(createPostAction(data));
        setFile();
        onClose();


    }


    return (
        <div>
            <Modal
                size={"2xl"}
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <div className='flex justify-between py-1 px-10 items-center'>
                        <p>Create New Post</p>
                        <Button
                            variant={"ghost"}
                            size={"sm"}
                            colorScheme={"blue"}
                            onClick={handleCreatePost}
                        >
                            Share
                        </Button>
                    </div>
                    <hr />
                    <ModalBody>
                        <div className='h-[70vh] justify-between pb-5 flex'>
                            <div className='w-[50%]'>
                                {!file && <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    className='drag-drop h-full'
                                >
                                    <div>
                                        <FaPhotoVideo className='text-3xl' />
                                        <p>Drag Photos or Video here</p>
                                    </div>
                                    <label htmlFor='file-upload' className='custom-file-upload'>Select From Computer</label>
                                    <input type='file' id="file-upload" accept='image/* , video/*' onChange={handleOnChange} />
                                </div>}
                                {file && <img className='max-h-full' src={URL.createObjectURL(file)} alt="" />}

                            </div>
                            <div className='w-[1px] border h-full'></div>
                            <div className='w-[50%]'>
                                <div className='flex -items-center px-2'>
                                    <img className='w-7 h-7 rounded-full'src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                    <p className='font-semibold ml-4'>{user?.reqUser?.username}</p>
                                </div>
                                <div className='px-2'>
                                    <textarea className='captionInput' name='caption' rows="8" placeholder='Write a caption' onChange={handleCaptionChange}></textarea>
                                </div>
                                <div className='flex justify-between px-2'>
                                    <GrEmoji />
                                    <p className='opacity-70 '>{caption?.length}/2000</p>
                                </div>
                                <hr />
                                <div className='p-2 flex justify-between items-center'>
                                    <input onChange={(e) => setLocation(e.target.value)} className='locationInput' type="text" placeholder='loaction' name='location' />
                                    <GoLocation />
                                </div>
                                <hr />
                            </div>


                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </div>
    )
}
