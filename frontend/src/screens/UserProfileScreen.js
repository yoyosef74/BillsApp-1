import React, {useState, useEffect} from 'react'
import {
  useParams
} from "react-router-dom";
import axios from 'axios'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const UserProfileScreen = () => {
    let {id,token,userId} = useParams();
    const [error,setError] = useState('');
    const [user,setUser] = useState('');
    const [emailError,setEmailError] = useState('');
    const [message,setMessage] = useState('');

    //Activation Email
    const sendActivationEmail = async(e) => {
        try{
            e.preventDefault()
             const config = {
                headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
                }
             }
             const url = "http://localhost:8000/api/v1/users/admin/sendActivationEmail";
             await axios.post(url, {email: user.email}, config);
             setMessage('Email Sent')
        }
        catch(err){
            setEmailError(err);
        }
    }

    useEffect(()=>{
         const getUsersList = async() => {
        try {
             const config = {
                headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
                }
             }
            const {data} = await axios.get(`http://localhost:8000/api/v1/users/${userId}`,config)
            setUser(data.data.user)
        }
        catch(err) {
            setError(err)
        }}
        getUsersList();
    },[])

  return (
    <body>
        {!user?<div>loading</div>:
        <div className="d-flex" id="wrapper">

          
            <div className="bg-white" id="sidebar-wrapper7">
                <div className="sidebar-logo">
                    <img src={firstImage} alt="" />
                </div>

                <div className="list-group list-group-flush my-3">

                    <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Home
                    </a>

                    <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-arrow-left me-2"></i> User Requests
                    </a>

                    <a href="/" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
                        <i className="fas fa-power-off me-2 mt-5 pt-5 fs-5"></i>Logout
                    </a>
                </div>
            </div>
           
            <div id="page-content-wrapper">

                <nav className="navbar navbar-expand-lg navbar-light bg-transparent pt-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Admin Panel</h2>
                    </div>
                </nav>

                <div className="container-fluid px-4">
                    <div className="row">           
                            
                            <div className="form-container7">
                                
                                <img className="rounded-circle border border-4 border-light" src="imgs/71f3519243d136361d81df71724c60a0.png" alt="" />
                                <h2 className="text-center fw-bolder mb-5 pt-3 pb-4">User Profile</h2>
                            
                                <div className="col">
                                    <table className="table bg-white rounded shadow-sm">

                                        <tbody>
                                            <tr>
                                                <td className="pb-4 ps-4">Merchant Name:</td>
                                                <td className="text-center fw-semibold">{user.name}</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Email:</td>
                                                <td className="text-center fw-semibold">{user.email}</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Commercial number:</td>
                                                <td className="text-center fw-semibold">{user.commercialNum}</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Commercial subscription:</td>
                                                <td className="text-center fw-semibold">{user.commercialSub}</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Bills cycle:</td>
                                                <td className="text-center fw-semibold">{user.billsCycle}</td>
                                            </tr>
                            
                                        </tbody>
                                    </table>
                                     {
                                    emailError?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>Error Sending Email, Please try again later or check the provided email </label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large'}}>Email Sent Successfully! </label>:<></>                   
                                }
                                <div className="control text-center mt-4">
                                    <button className="btn btn-primary rounded-pill px-5 " onClick={sendActivationEmail}>Send Activation Email</button>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>}
        </body>
  )
}

export default UserProfileScreen