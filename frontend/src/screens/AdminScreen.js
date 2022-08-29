import React from 'react'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')
const AdminScreen = () => {
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
                                            <th scope="col" width="200">Approve</th>
                                            <th scope="col" width="200">Reject</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         
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