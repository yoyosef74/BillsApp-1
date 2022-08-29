import React from 'react'
const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const UserReportsScreen = () => {
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

                    <a href="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold fs-5">
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
                                            <td className="text-center pt-4 fw-semibold">jfdf fkf dkle wjqwuq</td>
                                        </tr>
                        
                                        <tr>
                                            <td className="pb-2 ps-4">Email:</td>
                                            <td className="text-center fw-semibold">07775000077750000777k</td>
                                        </tr>
                        
                                        <tr>
                                            <td className="pb-2 ps-4">Commercial number:</td>
                                            <td className="text-center fw-semibold">zmdkdjhf587@yahoo.com</td>
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
                                            <th scope="col" width="100">ldksrios</th>
                                            <th scope="col" width="100">fksffjkj</th>
                                            <th scope="col" width="100">fmfkfjfsk</th>
                                            <th scope="col" width="100">daopdirrio</th>
                                            <th scope="col" width="100">daopdirrio</th>
                                            <th scope="col" width="100">daopdirrio</th>
                                            <th scope="col" width="100">daopdirrio</th>
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

export default UserReportsScreen