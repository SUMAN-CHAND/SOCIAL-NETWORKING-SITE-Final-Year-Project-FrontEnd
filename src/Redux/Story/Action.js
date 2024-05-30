import { CREATE_NEW_STORY, FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY } from "./ActionType";


const BASE_API = 'http://localhost:5454/api';

export const createStoryAction = (data) => async (dispatch) => {
    try {

        const res = await fetch(`${BASE_API}/stories/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
            body: JSON.stringify(data.data),
        })
        const story = await res.json();
        console.log(story)
        dispatch({ type: CREATE_NEW_STORY, payload: story })

    } catch (error) {
        console.log("catch error: " + error)
    }
}



export const findFollowingUSerStory = (data) => async (dispatch) => {

    try {

        const res = await fetch(`${BASE_API}/stories/f/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
        })
        const stories = await res.json();
        console.log("stories",stories)
        dispatch({ type:FETCH_FOLLOWING_USER_STORY, payload: stories })

    } catch (error) {
        console.log("catch error: " + error)
    }

}

export const findStoryByUserID = (data) => async (dispatch) => {
console.log("data story", data)
    try {

        const res = await fetch(`${BASE_API}/stories/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt
            },
        })
        const stories = await res.json();
        console.log("stories",stories)
        dispatch({ type:FETCH_USER_STORY, payload: stories })

    } catch (error) {
        console.log("catch error: " + error)
    }

}