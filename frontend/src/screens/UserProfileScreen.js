import React from 'react'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const UserProfileScreen = () => {
  return (
    <body>
        <div className="d-flex" id="wrapper">

          
            <div className="bg-white" id="sidebar-wrapper7">
                <div className="sidebar-logo">
                    <img src={firstImage} alt="" />
                </div>

                <div className="list-group list-group-flush my-3">

                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-home me-2 mt-4"></i>Home
                    </a>

                    <a href="#" className="list-group-item list-group-item-action bg-transparent second-text fw-bold fs-5">
                        <i className="fa fa-arrow-left me-2"></i> User Requests
                    </a>

                    <a href="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
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
                                                <td className="text-center fw-semibold">jfdf dfjkdf fkf dkle wjqwuq</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Email:</td>
                                                <td className="text-center fw-semibold">07775000077750000777k</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Commercial number:</td>
                                                <td className="text-center fw-semibold">zmdkdjhf587@yahoo.com</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Commercial subscription:</td>
                                                <td className="text-center fw-semibold">002225558887774441113336</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Reports:</td>
                                                <td className="text-center fw-semibold">gmhlul</td>
                                            </tr>
                            
                                            <tr>
                                                <td className="pb-4 ps-4">Bills cycle:</td>
                                                <td className="text-center fw-semibold">mkhoyly</td>
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

export default UserProfileScreen