import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const UserReportsScreen = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState('');
    let {userId,token,id} = useParams();
    const [error,setError] = useState('');
    const[reports,setReports] = useState('');
    const logout = async(e) => {
         e.preventDefault();
        try {
         const config = {
        // withCredentials: true,
         headers: {
        'Content-Type': 'application/json; charset=UTF-8'
         },
        }
        const url = "/api/v1/users/logout";
        await axios.post(url, config);
    }
         catch(err){
            console.log(err);
         }
    navigate('/login')
    }

    useEffect(()=>{
        const getUser = async() => {
            try {
                 const config = {
                    headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`
                    }
                 }
                const {data} = await axios.get(`/api/v1/users/${userId}`,config)
                setUser(data.data.user);
            }
            catch(err) {
                setError("Error Occured While Fetching Your Data")
            }}
        const getReports = async() => {
            try{
                if(!user)
                    return
                const {data} = await axios.post('http://10.140.173.14:9096/billStatusReport', {
                    billerCode:
                    user.billerCode,
                    //  905172 ,
                    serviceId: 905079
                },
                {
                    auth:{
                        username: 'basma',
                        password: 'basma'
                    }
                }
                )
                console.log(1)
                setReports(data.data)
            }
            catch(err) {
                setError("Error Occured While Fetching Your Data");
            }
        }
        const onRender = () =>{
            getUser()
            getReports();
        } 
        onRender();
    },[user.billerCode])
  return (
    <body>
        <div className="d-flex" id="wrapper">

            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-logo">
                    <img src={firstImage} alt="" />
                </div>

                <div className="list-group list-group-flush my-3">

                    <a href={`/financial-user/${id}/${token}`} className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Home
                    </a>

                    <a href="/login" onClick={logout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
                        <i className="fas fa-power-off me-2 mt-5 pt-5 fs-5"></i>Logout
                    </a>
                </div>
            </div>
           
            <div id="page-content-wrapper8">

                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Financial User Panel</h2>
                    </div>
                </nav>

                <div className="container-fluid px-4">
                    <div className="row my-5">

                        <div className="form-container8">
                                
                            <img className="rounded-circle mb-3" src="imgs/71f3519243d136361d81df71724c60a0.png" alt="" />
                        
                            <div className="col">
                                <table className="table bg-white rounded shadow-sm">

                                    <tbody>
                                        <tr>
                                            <td className="pb-2 pt-4 ps-4">Merchant Name:</td>
                                            <td className="text-center pt-4 fw-semibold">{user.name}</td>
                                        </tr>
                        
                                        <tr>
                                            <td className="pb-2 ps-4">Email:</td>
                                            <td className="text-center fw-semibold">{user.email}</td>
                                        </tr>
                        
                                        <tr>
                                            <td className="pb-2 ps-4">Commercial number:</td>
                                            <td className="text-center fw-semibold">{user.commercialNum}</td>
                                        </tr>
                                        <tr>
                                            <td className="pb-2 ps-4">Biller Code:</td>
                                            <td className="text-center fw-semibold">{user.billerCode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="Head-Table8">
                            <h3 className="fs-5 mb-3 fw-bolder">Reports</h3>

                            <div className="col">
                                <table className="table table-bordered text-center bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="10">#</th>
                                            <th scope="col" width="100">billerName</th>
                                            <th scope="col" width="100">amount</th>
                                            <th scope="col" width="100">Due Date</th>
                                            <th scope="col" width="100">Expiry Date</th>
                                            <th scope="col" width="100">Mobile Number</th>
                                            <th scope="col" width="100">status</th>
                                            <th scope="col" width="100">billNumber</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {reports?(reports.map((el,i) => {
                                         return <tr>
                                                    <td>{i}</td>
                                                    <td>{el.customerName}</td>
                                                    <td>{el.amount}</td>
                                                    <td>{el.dueDate}</td>
                                                    <td>{el.expirationDate}</td>
                                                    <td>{el.mobileNumber}</td>
                                                    <td>{el.status}</td>
                                                    <td>{el.billNumber}</td>
                                                </tr>
                                }))
                                :<></>
                                }
                                    </tbody>
                                </table>
                                
                                {error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error}</label>:<></>}
                            </div> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}

export default UserReportsScreen