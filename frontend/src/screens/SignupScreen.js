import React, { useState } from 'react'
import {Form} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')
const capture = require('./imgs/Capture.PNG');
const axios = require('axios')

const SignupScreen = () => {
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [commercialSub, setcommercialSub] = useState('');
    const [commercialNum, setcommercialNum] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [billsCycle, setBillsCycle] = useState('');
    const [remindersCycle, setReminderCycle] = useState('');
    
    const [error, setError] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(billsCycle);
        try {
         const config = {
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    }
        const url = "http://localhost:8000/api/v1/users/signup";
        const {data} = await axios.post(url, 
            {
                'email': email,
                'password': password,
                name,
                commercialSub,
                commercialNum,
                passwordConfirm,
                billsCycle,
                remindersCycle,
                role :'user'
            },
             config);
        const {token} = data;
        console.log(data)
        navigate(`/Waiting/${data.data.user._id}/${token}`);
     }
        catch(err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }
  return (
     <body>
        <div className="row g-0 overflow-hidden">
            <div className="col-lg-5 g-0">
                <div className="left-side  overflow-hidden">

                </div>
            </div>

            <div className="col-lg-7 g-0">
                <div className="right-side overflow-hidden">
                    
                    <div className="logo mt-3">
                        <img src={firstImage} alt=""/>
                            
                    </div>
                    <div className="logo2">
                        <img src={capture} alt=""/>
                    </div>

                    <div className="content">
                        <h5 className="title text-center mb-4 py-4">Sign up</h5>

                        <div className="Form-box">
                            <Form onSubmit={submitHandler}>
                                <div className="row">
                                    
                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setName(e.target.value)} className="form-control" name="MerchantName" type="text" placeholder="Merchant Name" required />
                                    </div>                                

                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setcommercialSub(e.target.value)} className="form-control" name="CommercialSub" type="text" placeholder="Commercial subscription" required />
                                    </div>
                                    <div className="col-md-1"></div>

                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setcommercialNum(e.target.value)} className="form-control" name="CommercialNum" type="number" placeholder="Commercial number" required />
                                    </div>                                

                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setEmail(e.target.value)} className="form-control" name="ClientEmail" type="email" placeholder="Email" required />   
                                    </div>
                                    <div className="col-md-1"></div>


                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setPassword(e.target.value)} className="form-control" name="Psw" type="password" placeholder="Password" required />
                                    </div>                                

                                    <div className="col-md-5 mb-3">
                                        <input  onChange={(e)=> setpasswordConfirm(e.target.value)} className="form-control" name="ConfPsw" type="password" placeholder="Confirm password" required />
                                    </div>
                                    <div className="col-md-1"></div>


                                    <div className="col-md-1"></div>
                                    <div className="col-md-5 mb-3">
                                        <select  onChange={(e)=> setReminderCycle(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option selected disabled>Reports</option>
                                            <option value="monthly">monthly</option>
                                            <option value="weekly">weekly</option>
                                            <option value="quarterly">quarterly</option>
                                        </select>
                                    </div>

                                    <div className="col-md-5 mb-3">
                                        <select className="form-select"  onChange={(e)=> setBillsCycle(e.target.value)} aria-label="Default select example">
                                            <option selected disabled>Bills cycle</option>
                                            <option value="monthly">monthly</option>
                                            <option value="weekly">weekly</option>
                                            <option value="quarterly">quarterly</option>
                                        </select>
                                    </div>
                                    <div className="col-md-1"></div>

                                    <div className="col-md-12 mt-4 text-center">
                                        <button className="btn btn-primary rounded-pill px-5">Sign up</button>
                                    </div>
                                    <div className="control text-center mt-4">
                                    <a href='/login' className="px-5 ">Already have an account?</a>
                                </div>
                                    <div className="control text-center mt-4">
                                   {error!==''?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error}</label>:<label></label>}
                                </div>     
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

export default SignupScreen
