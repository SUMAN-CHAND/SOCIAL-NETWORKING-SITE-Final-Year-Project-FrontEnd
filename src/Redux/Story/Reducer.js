import { CREATE_NEW_STORY, FETCH_USER_STORY } from "./ActionType"

const initialState ={
    stories:null,
    createstory:null
}
export const StoryReducer=(store=initialState,{type,payload}) =>{
    if(type === FETCH_USER_STORY){
        return {...store,stories:payload}
    }
    else if(type === CREATE_NEW_STORY){
        return {...store,createstory:payload}
    }
    return store;
}