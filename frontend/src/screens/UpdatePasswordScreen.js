import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
const axios = require('axios');

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
        const url = "http://localhost:8000/api/v1/users/updatePassword";
        // const {data} = 
        await axios.patch(url, {passwordCurrent,password,passwordConfirm}, config);
        setMessage('Password updated successfully!')
     }
        catch(err) {
            console.log(err)
            setError(err.message)
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
        const url = "http://localhost:8000/api/v1/users/updateEmail";
        // const {data} = 
        await axios.patch(url, {email}, config);
        setMessage2('Email OTP is sent!')
     }
        catch(err) {
            console.log(err)
            setError2(err.message)
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
        const url = "http://localhost:8000/api/v1/users/verifyEmail";
        // const {data} = 
        await axios.patch(url, {OTP}, config);
        setMessage2('EmaiL uPDted')
     }
        catch(err) {
            console.log(err)
            setError2(err.message)
        }
    }


  return (
    <body>
            <div class="container-fluid px-4">
                    <div class="row">                                       
                            <div class="form-container9">
                                
                                <h1 class="text-center mb-4 pb-4">Update Email</h1>


                                <Form >
                                    <div class="control">
                                        <input onChange={(e)=> setEmail(e.target.value)} class = "form-control mb-4" name="CurrentPsw" type="email" placeholder="Current Password" required/>
                                    </div>
    

                                    <div class="control text-center mt-4">
                                        <button onClick={updateEmail} class="btn btn-primary rounded-pill px-5 ">Change Email</button>
                                    </div>


                                    { message2? <div class="control">
                                        <input onChange={(e)=> setOTP(e.target.value)} class ="form-control mb-4" name="NewPsw" type="number" placeholder="New Password" required/>
                                    </div>:<></> }

                                    <div class="control text-center mt-4">
                                        <button onClick={verifyEmail} class="btn btn-primary rounded-pill px-5 ">Verify Email</button>
                                    </div>
                                  

                                    <div className="control mb-5">
                                 {
                                    error2?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error2}</label>:
                                    message2?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>{message2} <a href='/login'> Please Click Here to Login</a></label>:
                              
                               <></>
                               
                                }
                                </div>
                                </Form>



                                <Form onSubmit={submitHandler}>
                                    <div class="control">
                                        <input onChange={(e)=> setPasswordCurrent(e.target.value)} class = "form-control mb-4" name="CurrentPsw" type="password" placeholder="Current Password" required/>
                                    </div>
    
                                    <div class="control">
                                        <input onChange={(e)=> setPassword(e.target.value)} class ="form-control mb-4" name="NewPsw" type="password" placeholder="New Password" required/>
                                    </div>

                                    <div class="control mb-5">
                                    <input onChange={(e)=> setPasswordConfirm(e.target.value)} class ="form-control mb-4"name ="ConfirmNewPsw" type="password" placeholder="Confirm New Password" required/>
                                    </div>
                                    
                                    <div class="control text-center mt-4">
                                        <button class="btn btn-primary rounded-pill px-5 ">Update Password</button>
                                    </div>

                                    <div className="control mb-5">
                                 {
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error}</label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>{message} <a href='/login'> Please Click Here to Login</a></label>:
                              
                               <></>
                               
                                }
                                </div>
                                </Form>
                            </div>
                    </div>
                </div>
            
        <script src="js/bootstrap.bundle.min.js"></script>
    </body>
  )
}

export default UpdatePasswordScreen