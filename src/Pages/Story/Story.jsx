import React, { useEffect } from 'react'
import StoryViwer from '../../Components/StoryComponents/StoryViwer'
import { useDispatch, useSelector } from 'react-redux'
import { findStoryByUserID } from '../../Redux/Story/Action';
import { useParams } from 'react-router-dom';

export default function Story() {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const { userId } = useParams();
    const { story } = useSelector(store => store);

    useEffect(() => {
        const data = {
            jwt: token,
            userId: userId,
        }
        console.log("Story user id", userId);
        dispatch(findStoryByUserID(data))
        console.log("Story dispatch*--------------------")
    }, [])
    const data = {
        jwt: token,
        userId: userId,
    }
    dispatch(findStoryByUserID(data))


    useEffect(() => {
        console.log("Story user id", userId);

    }, [userId])

    console.log("storys-------------------- ", story)
    return (

        <div>
            {story.stories &&
                <StoryViwer stories={story?.stories} />
            }
        </div>
    )
}
// const story = [
//     {
//         image:"https://cdn.pixabay.com/photo/2024/02/01/19/59/ai-generated-8546651_640.jpg"
//     },
//     {
//         image:"https://cdn.pixabay.com/photo/2024/01/31/18/37/woman-8544587_640.jpg"
//     },
//     {
//         image:"https://cdn.pixabay.com/photo/2024/02/01/20/04/ai-generated-8546679_640.jpg"
//     },
//     {
//         image:"https://cdn.pixabay.com/photo/2024/02/01/04/21/ai-generated-8545223_640.jpg"
//     }
// ]