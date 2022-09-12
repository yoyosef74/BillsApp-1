import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {
    useNavigate,
  useParams
} from "react-router-dom";
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')
const HomeScreen = () => {
    const navigate = useNavigate();
  let {id,token} = useParams();
  const [xlsx,setXlsx] = useState('');
   const [user,setUser] = useState('');
  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
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
  
  const onFileChange = event => {
    setXlsx(event.target.files[0])
  }
  const onFileUpload = async() => {
    try{
    const formData = new FormData();
    formData.append("file",xlsx,xlsx.name);
    const serviceId = 905079;
    formData.append("serviceId",serviceId);
    
    //VPN
   const res= await axios.post("http://10.140.173.14:9096/upload", formData,{
        auth: {
            username: 'basma',
            password: 'basma'
        }
    });
    console.log(res)
    setMessage('Uploaded Successfuly')
  }
  catch(err){
    console.log(err)
    setError('Error occured while uploading your file, please check the given format!')
  }
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
                const {data} = await axios.get(`/api/v1/users/${id}/me`,config)
                setUser(data.data.user)
            }
            catch(err) {
                console.log(err)
                setError(err)
            };
        }
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
                setReports(data.data)
                console.log(data);
            }
            catch(err) {
                setError("An error has occured"); 
                //console.log(err)
            }
        }
        const onRender = () =>{
            try{
            getUser()
            getReports();
        }
        catch (err){}
        } 
        onRender();
    },[user.billerCode]);
    
  return (
   <body>
        <div className="d-flex" id="wrapper">
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-logo">
                    <img src={firstImage} alt="" />
                </div>

                <div className="list-group list-group-flush my-3">

                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Home
                    </a>

                    <a href="/updateProfile" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Update Profile
                    </a>

                    <a href="/login" onClick={logout} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
                        <i className="fas fa-power-off me-2 mt-5 pt-5 fs-5"></i>Logout   
                    </a>
                </div>
            </div>
            
            <div id="page-content-wrapper">

                <div className="Upload">
                    <input type="file" name="xlsx" id="file" onChange={onFileChange} />

                   
                        {xlsx? <label for="file" className="rounded-pill">{xlsx.name} <i className="fa fa-upload ms-3"></i> </label> 
                        : <label for="file" className="rounded-pill">Choose file here <i className="fa fa-upload ms-3"></i> </label> }
                    {
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large',background:'transparent'}}>Error Occurred while uploading your file</label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'orange',fontSize:'large',background:'transparent'}}>{message}</label>:
                                    <button  className='m-auto text-center btnupl' variant="success" style={{fontSize:'x-large', background:'fff'}}
                                        onClick={onFileUpload}> 
                                        Upload! 
                                    </button> 
                               
                    }

                    {/* <label for="file" className="rounded-pill">
                        Upload file here
                        <i className="fa fa-upload ms-3"></i>
                    </label>
                    <button  className='m-auto text-center' variant="success" onClick={onFileUpload}> 
                     Upload! 
                   </button>  */}

                </div>
                

                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Dashboard</h2>
                    </div>
                </nav>

                <div className="container-fluid px-4">
                    <div className="row my-5">

                        <div className="Head-Table">
                            <h3 className="fs-5 mb-3">Reports</h3>

                            <div className="col">
                            <table className="table table-bordered text-center bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="10">#</th>
                                            <th scope="col" width="100">billerName</th>
                                            <th scope="col" width="100">Available amount</th>
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
                                })):error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>Error Occurred while fetching the Users,Please try again later</label>
                                :<></>}
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

export default HomeScreen
