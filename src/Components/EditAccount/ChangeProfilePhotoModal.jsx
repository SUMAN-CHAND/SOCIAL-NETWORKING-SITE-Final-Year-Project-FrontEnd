import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";

export default function ChangeProfilePhotoModal({isOpen,onOpen,onClose,handleProfileimageChange}){
    
    
    return(
        <>
            <Modal isOpen={isOpen} onClose={onClose}  isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader textAlign={"center"}> Modal Title</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col items-center">
                                <label htmlFor="profileImage"
                                 className="font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-ful ">
                                    Upload Photo
                                </label>
                                <input onChange={handleProfileimageChange} type="file" name="profileImage" id="profileImage" />
                            </div>
                            <hr />
                            <p className="font-bold py-3 text-red-600 text-center ">
                                Remove Photo
                            </p>
                            <hr />
                            <p className=" py-3 text-center " onClick={()=>onClose}>
                               Cancel
                            </p>
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
