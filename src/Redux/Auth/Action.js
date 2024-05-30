import { SIGN_IN, SIGN_UP } from "./ActionType";



export const signinAction =  (data) => async (dispatch) => {

    try {
        const response = await fetch("http://localhost:5454/api/users/signin", {
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Basic " + btoa(data.email + ":" + data.password),
               
            },
        })
                // const user = await res.json();

        const token = response.headers.get("Authorization");
       
        localStorage.setItem("token", token);
        dispatch({ type: SIGN_IN, payload: token });
        console.log("sign in token " + token);


    } catch (error) {
        console.log(error);
    }

};


export const signupAction = (data) => async (dispatch) => {

    try {
        const res = await fetch("http://localhost:5454/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })

        const user = await res.json();
        // console.log( user);
        dispatch({ type: SIGN_UP, payload:user });


    } catch (error) {
        console.log(error);
    }

};