import React, {useState, useEffect} from 'react'
import {
  useParams
} from "react-router-dom";
import axios from 'axios'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const AdminScreen = () => {
   
    let {id,token} = useParams();
    const [error,setError] = useState('');
    const [users,setUsers] = useState('');
    useEffect(()=>{
         const getUsersList = async() => {
        try {
             const config = {
                headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`
                }
             }
            const {data} = await axios.get('http://localhost:8000/api/v1/users/getAllNormalUsers',config)
            setUsers(data.data.users)
            // console.log(users)
        }
        catch(err) {
            setError(err)
        }}
        getUsersList();
    },[])
  return (
    <body>
        <div className="d-flex" id="wrapper">
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-logo">
                    <img src={firstImage} alt="" />
                </div>

                <div className="list-group list-group-flush my-3">

                    <a  className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Home
                    </a>

                    <a href="/" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
                        <i className="fas fa-power-off me-2 mt-5 pt-5 fs-5"></i>Logout
                    </a>
                </div>
            </div>
            <div id="page-content-wrapper">

                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Admin Panel</h2>
                    </div>
                </nav>

                <div className="container-fluid px-4">
                    <div className="row my-5">

                        <div className="Head1-Table">
                            <h3 className="fs-5 mb-3">Users Requests</h3>

                            <div className="col">
                                <table className="table table-bordered text-center bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="50">#</th>
                                            <th scope="col" width="400">Name</th>
                                            <th scope="col" width="400">Email</th>
                                            <th scope="col" width="200">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         {users?(users.map((el,i) => {
                                         return <tr>
                                                    <td>{i}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.email}</td>
                                                    <td>{el.active?"Verified":el.activationToken?"Verification Email Sent":"Not yet Verified"}</td>
                                                    <td><a href={`${token}/${el._id}`}> view</a></td>
                                                </tr>
                                })):<></>
                                }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </body>
  )
}

export default AdminScreen