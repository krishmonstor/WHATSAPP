import { BASE_API_URL } from "../../config/api"
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data) =>async(dispatch) =>{
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signup`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            // mode:'no-cors',
            body:JSON.stringify(data)
        });
        if(!res.ok)
        {
            throw new Error(`HTTP error! Status : ${res.status}`)
        }
        const resData = await res.json();
        if(resData.jwt){localStorage.setItem("token",resData.jwt)}
        else{
            console.log("no JWT received")
        }
        console.log("register",resData)
        dispatch({type:REGISTER,payload:resData})
    } catch (error) {
        console.log("register",error)
    }
}

export const login = (data) =>async(dispatch) =>{
    try {
        const res = await fetch(`${BASE_API_URL}/auth/signin`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",

            },
            body:JSON.stringify(data)
        })
        const resData = await res.json();
        console.log("register",resData)
        dispatch({type:LOGIN,payload:resData})
    } catch (error) {
        console.log("login" ,error)
    }
}


export const currentUser = (data,token) =>async(dispatch) =>{

    try {
        const res = await fetch(`${BASE_API_URL}/api/users/profile`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        const resData = await res.json();
        console.log("register",resData)
        dispatch({type:REQ_USER,payload:resData})
    } catch (error) {
        console.log("current User",error)
    }
}

export const searchUser = (data) =>async(dispatch) =>{
    try {
        const res = await fetch(`${BASE_API_URL}/api/users/search?name=${data.keyword}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${data.token}`
            },
            body:JSON.stringify(data)
        })
        const resData = await res.json();
        console.log("register",resData)
        dispatch({type:SEARCH_USER,payload:resData})
    } catch (error) {
        console.log("search User",error)
    }
}

export const updateUser = (data,token) =>async(dispatch) =>{
        try {
            const res = await fetch(`${BASE_API_URL}/users/update/${data.id}`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify(data)
            })
            const resData = await res.json();
            console.log("register",resData)
            dispatch({type:UPDATE_USER,payload:resData})
        } catch (error) {
            console.log("update User",error)
        }
    }
