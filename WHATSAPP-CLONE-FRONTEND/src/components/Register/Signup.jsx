import { Alert, Button, Snackbar } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {currentUser, register} from '../../Redux/Auth/Action'
const Signup = () => {
    // const handleSubmit = (e) =>{
    //     e.preventDefault()
    //     console.log(handleSubmit)
    // }
    const [openSnackbar,setOpenSnackbar] = useState(false)
    const navigate = useNavigate()
    const [inputData,setInputData] = useState({full_name: "" ,email:"" ,password: ""})
    const dispatch = useDispatch();
    const {auth} = useSelector(store => store);
    const token = localStorage.getItem("token")
    console.log("current user",auth.reqUser)


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("handle submit",inputData)

        try {
            dispatch(register(inputData));
            setOpenSnackbar(true)
        } catch (error) {
            console.log("Register error:",error)
            setOpenSnackbar(true)
        }

        
    }
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setInputData((values) => ({...values,[name]:value}))
    }
    const handleSnackbarClose = () =>{
        setOpenSnackbar(false)
    }
    useEffect(()=>{
        if(token)dispatch(currentUser(token))
    },[token])
    useEffect(()=>{
        if(auth.reqUser?.full_name){
            navigate("/")
        }
    },[auth.reqUser])
  return (
    <div>
      <div>
        <div  className='flex flex-col justify-center min-h-screen items-center'>
            <div className='w-[30%] p-10 shadow-md bg-white'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div >
                        <p className='mb-2'>User Name</p>
                        <input className='py-2 px-3 outline outline-green-600 w-full rounded-md border-black'
                        type="text" 
                        name = "full_name"
                        placeholder='Enter username'
                        onChange={(e) => handleChange(e)}
                        value = {inputData.full_name}
                        />
                    </div>
                    <div >
                        <p className='mb-2'>Email</p>
                        <input className='py-2 px-3 outline outline-green-600 w-full rounded-md border-black'
                        type="email" 
                        name='email'
                        placeholder='Enter your email'
                        onChange={(e) => handleChange(e)}
                        value = {inputData.email}
                        />
                    </div>

                    <div >
                        <p className='mb-2'>Password</p>
                        <input className='py-2 px-3 outline outline-green-600 w-full rounded-md border-black'
                        type="password" 
                        name='password'
                        placeholder='Enter your Password'
                        onChange={(e) => handleChange(e)}
                        value = {inputData.password}
                        />
                    </div>
                    <div>
                    <Button type='submit' sx={{bgcolor:green[700],padding:".5rem 0rem"}} className='w-full bg-green-600 hover:bg-red-600' variant='containded'>Sign Up</Button>
                </div>

                </form>



                <div className='flex space-x-3 items-center mt-5'>
                    <p className=''>Already Have Account?</p>
                    <Button variant='text'  onClick={() => navigate("/signin")}>sign in</Button>
                </div>
            </div>
        </div>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity='success' sx={{width:'100%'}}>Your Account is successfully Created</Alert>
        </Snackbar>
        
      </div>
      
    </div>
  )
}

export default Signup
