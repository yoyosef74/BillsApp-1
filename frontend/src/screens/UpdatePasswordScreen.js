import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
const axios = require('axios');
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const UpdatePasswordScreen = () => {
    const [email,setEmail] = useState('');
    const [OTP,setOTP] = useState('');
    const [passwordCurrent,setPasswordCurrent] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [error2, setError2] = useState('');
    const [message2, setMessage2] = useState('');


    const submitHandler = async(e) => {
        e.preventDefault();
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "/api/v1/users/updatePassword";
        // const {data} = 
        await axios.patch(url, {passwordCurrent,password,passwordConfirm}, config);
        setMessage('Password updated successfully!')
     }
        catch(err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }

    const updateEmail = async(e) => {
        e.preventDefault();
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "/api/v1/users/updateEmail";
        // const {data} = 
        await axios.patch(url, {email}, config);
        setMessage2('Email OTP is sent!')
     }
        catch(err) {
            console.log(err)
            setError2("Error Sending OTP,Please try again later or check the provided email if it is valid")
        }
    }
    const verifyEmail = async(e) => {
        e.preventDefault();
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "/api/v1/users/verifyEmail";
        // const {data} = 
        await axios.patch(url, {OTP}, config);
        setMessage2('Email updated')
     }
        catch(err) {
            console.log(err)
            setError2("Invalid OTP, Please try again or refresh and send another OTP")
        }
    }


  return (
    <body>
    <div class="d-flex" id="wrapper">

        
        <div class="bg-white" id="sidebar-wrapper7">
            <div class="sidebar-logo">
                <img src={firstImage} alt=""/>
            </div>

            <div class="list-group list-group-flush my-3">

                <a href="#" class="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                    <i class="fa fa-home me-2 mt-4"></i>Home
                </a>


                <a href="/login" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
                    <i class="fas fa-power-off me-2 mt-5 pt-5 fs-5"></i>Logout
                </a>
            </div>
        </div>
        
        <div id="page-content-wrapper">

            <nav class="navbar navbar-expand-lg navbar-light bg-transparent pt-4 px-4">
                <div class="d-flex align-items-center">
                    <i class="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                    <h2 class="fs-2 m-0">Dashboard</h2>
                </div>
            </nav>
            <hr/>
            <div class="container-fluid px-4">
                <div class="row">

                        <div class="form-container10">
                                
                            <h4 class=" mb-2 pb-3">ACCOUNT SETTINGS</h4>

                            <Form >
                                <div class="control">
                                    <input onChange={(e)=> setEmail(e.target.value)} class="form-control mb-3" name="userName" type="text" placeholder="Email address" required/>
                                </div>

                                <div class="control mb-3">
                                    <input onChange={(e)=> setOTP(e.target.value)} disabled = {!message2} class="form-control mb-3" name="userEmail" type="email" placeholder="OTP" required/>
                                </div>
                                
                                <div class="control text-center mt-3">
                                    <button onClick = {message2? verifyEmail:updateEmail}class="btn btn-primary rounded-pill px-3 ">{!message2? "Send OTP":"verifyEmail"}</button>
                                </div>
                                <div className="control mb-5">
                                 {
                                    error2?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error2}</label>:
                                    message2?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>{message2} </label>:
                              
                                    <></>
                               
                                }
                                </div>
                            </Form>
                        </div>
                    
                        <div class="form-container9">
                            
                            <h4 class=" mb-2 pb-3">CHANGE PASSWORD</h4>

                            <Form onSubmit={(submitHandler)}>
                                <div class="control">
                                    <input onChange={(e)=> setPasswordCurrent(e.target.value)} class="form-control mb-3" name="CurrentPsw" type="password" placeholder="Current Password" required/>
                                </div>

                                <div class="control">
                                    <input onChange={(e)=> setPassword(e.target.value)} class="form-control mb-3" name="NewPsw" type="password" placeholder="New Password" required/>
                                </div>

                                <div class="control mb-3">
                                    <input onChange={(e)=> setPasswordConfirm(e.target.value)} class="form-control mb-3" name="ConfirmNewPsw" type="password" placeholder="Confirm New Password" required/>
                                </div>
                                
                                <div class="control text-center mt-3">
                                    <button class="btn btn-primary rounded-pill px-3 ">SAVE PASSWORD</button>
                                </div>
                                <div className="control mb-5">
                                 {
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error}</label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>{message} </label>:
                              
                                    <></>
                               
                                }
                                </div>
                            </Form>
                        </div>
                </div>
            </div>
        </div>
    </div>
   


    
   
</body>

  )
}

export default UpdatePasswordScreen