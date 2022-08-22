import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
const axios = require('axios');

const ForgetPasswordScreen = () => {
    const [email,setEmail] = useState('');
    const [error, setError] = useState('');
     const [message, setMessage] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "http://localhost:8000/api/v1/users/forgotPassword";
        // const {data} = 
        await axios.post(url, { email}, config);
        setMessage('Email Sent')
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
                        
                        <div className="form-container col-lg-6">

                            <h1 className="text-center mb-4 pb-4">Forgot Password</h1>

                            <Form onSubmit={submitHandler}>
                                <div className="control">
                                    <input onChange={(e)=> setEmail(e.target.value)} className= "form-control mt-4 mb-2" name="Email" type="email" placeholder="Email" required />
                                </div>
                                  <div className="control mb-5">
                                {
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>Error Sending Email, Please try again later or check the provided email </label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>Email Sent Successfully! </label>:
                              
                                    <p>we are going to send you message to this Email to make you create
                                       a new password, it will take seconds only</p>
                               
                                }
                                 </div>
                                <div className="control text-center mt-4">
                                    <button className="btn btn-primary rounded-pill px-5 ">Send</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>        
            </div>
            
        <script src="js/bootstrap.bundle.min.js"></script>
    </body>
  )
}

export default ForgetPasswordScreen