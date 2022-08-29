import React, {useState} from 'react'
import axios from 'axios'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')
const HomeScreen = () => {
  const [xlsx,setXlsx] = useState('');
  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
  
  const onFileChange = event => {
    setXlsx(event.target.files[0])
  }
  const onFileUpload = async() => {
    try{
    //      const config = {
    //      headers: {
    //     'Content-Type': 'application/json; charset=UTF-8',
    //     'Authorization': `JWT ${token}`
    //   },
    // }
    
    const formData = new FormData();
    formData.append("xlsx",xlsx,xlsx.name);
    console.log('here')
    await axios.post("http://localhost:8000/api/v1/bills", formData);
    setMessage('Uploaded Successfuly')
  }
  catch(err){
    console.log(err)
    setError('Error occured while uploading your file, please check the given format!')
  }
}
  
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

                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-file me-2"></i> Reports
                    </a>

                    <a href="/login" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
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
                                    error?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large',background:'transparent'}}>{error}</label>:
                                    message?<label className='m-auto text-center' variant="success" style={{color: 'green',fontSize:'large',background:'transparent'}}>{message}</label>:
                                    <button  className='m-auto text-center' variant="success" style={{fontSize:'x-large', background:'#3e2'}}
                                        onClick={onFileUpload}> 
                                        Upload! 
                                    </button> 
                               
                    }

                    <label for="file" className="rounded-pill">
                        Upload file here
                        <i className="fa fa-upload ms-3"></i>
                    </label>
                    <button  className='m-auto text-center' variant="success" onClick={onFileUpload}> 
                     Upload! 
                   </button> 

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
                            <h3 className="fs-5 mb-3">Uploading History</h3>

                            <div className="col">
                                <table className="table table-bordered text-center bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col" width="50">#</th>
                                            <th scope="col" width="420">Files</th>
                                            <th scope="col" width="450">Date</th>
                                            <th scope="col">Download</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" width="100">1</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>   </td>
                                            <td>   </td>
                                            <td>
                                                <a href="#" className="list-group-item-action second-text fw-bold fs-5">
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </td>
                                        </tr>   
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
