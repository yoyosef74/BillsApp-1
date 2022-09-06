import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import cookieClient from 'react-cookie'
const axios = require('axios')


const LoginScreen = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
         const config = {
        // withCredentials: true,
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "http://localhost:8000/api/v1/users/login";
        const res = await axios.post(url, { email, 'password': password}, config);
        const {data} = res;
        const {token} = data;
        // console.log(data)
        if(data.data.user.active) {
            if(data.data.user.role ==='user') {
                navigate(`/HomeScreen/${data.data.user._id}/${token}`);}
        else if(data.data.user.role ==='admin' || data.data.user.role ==='financial-user')
        navigate(`/${data.data.user.role}/${data.data.user._id}/${token}`);
        }
        else
        navigate(`/Waiting/${data.data.user._id}/${token}`);
     }
        catch(err) {
            console.log(err)
            setError(err.message)
        }
    }
  return (
    <body>
            <div className="row g-0 overflow-hidden">

                <div className="col-lg-5 g-0">
                    <div className="left-side  overflow-hidden"></div>
                </div>
    
                <div className="col-lg-7 g-0">
                    <div className="right-side overflow-hidden">            

                        <div className="logo overflow-hidden">
                            <img src="imgs/Image 2022-08-21 at 11.51.16 AM.jpeg" alt="" />
                        </div>
                        <div className="logo2 overflow-hidden">
                            <img src="imgs/Capture.PNG" alt="" />
                        </div>
                        
                        <div className="form-container1 col-lg-6">

                            <h1 className="text-center fw-bolder mb-4 pb-4">WELCOME</h1>

                            <Form onSubmit={submitHandler}>
                                <div className="control">
                                    <input className="form-control my-4" onChange={(e)=> setEmail(e.target.value)} name="Email" type="email" placeholder="Email" required />
                                </div>

                                <div className="control">
                                    <input onChange={(e)=> setPassword(e.target.value)} className="form-control mb-4" name="Psw" type="password" placeholder="Password" required />
                                </div>


                                <div className="link mt-4">
                                    <a href="/forgotPassword">Forgot password ?</a>
                                </div>
                                
                                <div className="control text-center mt-4">
                                    <button className="btn btn-primary rounded-pill px-5 ">Login</button>
                                </div>

                                 <div className="control text-center mt-4">
                                    <a href='/signup' className="px-5 ">Don't have an account?</a>
                                </div>

                                <div className="control text-center mt-4">
                                   {error!==''?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>Invalid Email or Password! </label>:<label></label>}
                                </div>                           
                            </Form>
                        </div>
                    </div>
                </div>        
            </div>
    </body>
  )
}

export default LoginScreen