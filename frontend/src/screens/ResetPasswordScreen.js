import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import {
  useParams
} from "react-router-dom";
const axios = require('axios')
const ResetPasswordScreen = () => {

    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    let {token} = useParams();
    const [message,setMessage] = useState('')

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = `http://localhost:8000/api/v1/users/resetPassword/${token}`;
        // const {data} = 
        await axios.patch(url, {password, passwordConfirm}, config);
        setMessage('Password Successfuly Updated');
     }
        catch(err) {
            console.log(err)
            setError(err.message)
        }
    }
  return (
    <body>       
            <div class="row g-0 overflow-hidden">

                <div class="col-lg-5 g-0">
                    <div class="left-side  overflow-hidden"></div>
                </div>
    
                <div class="col-lg-7 g-0">
                    <div class="right-side overflow-hidden">            

                        <div class="logo overflow-hidden">
                            <img src="imgs/Image 2022-08-21 at 11.51.16 AM.jpeg" alt="" />
                        </div>
                        <div class="logo2 overflow-hidden">
                            <img src="imgs/Capture.PNG" alt="" />
                        </div>
                        
                        <div class="form-container col-lg-6">

                            <h1 class="text-center mb-4 pb-4">Create New Password</h1>

                              <Form onSubmit={submitHandler}>
                                <div class="control">
                                    <input onChange={(e)=> setPassword(e.target.value)} class="form-control mb-4" name="CreatePsw" type="password" placeholder="Create Password" required />
                                </div>

                                <div class="control mb-5">
                                    <input onChange={(e)=> setPasswordConfirm(e.target.value)} class="form-control mb-4" name="RetypePsw" type="password" placeholder="Retype Password" required />
                                </div>
                                
                                <div class="control text-center mt-4">
                                    <button class="btn btn-primary rounded-pill px-5 ">I'm Done</button>
                                </div>
                                <div className="control mb-5">
                                 {
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error}</label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>{message} <a href='/login'> Please Click Here to Login</a></label>:
                              
                                    <p>we are going to send you message to this Email to make you create
                                       a new password, it will take seconds only</p>
                               
                                }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>        
            </div>
    </body>
  )
}

export default ResetPasswordScreen