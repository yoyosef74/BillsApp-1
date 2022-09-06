import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {
    useNavigate,
  useParams
} from "react-router-dom";

const firstImage = require('./imgs/Image 2022-08-21 at 11.51.16 AM.jpeg')

const ActivationScreen = () => {
    const navigate = useNavigate();
    const {token,id} = useParams();
    const [error, setError] = useState('');
    const [user, setUser]= useState('');
    const activateAccount = async() =>{
        try{
          console.log(3)
          await axios.post(`http://localhost:8000/api/v1/users/activate/${token}`);
        // Check if there is a user
        // const res = await axios.post(`http://10.140.173.14:9096/billerConfig`,user)
        navigate('/login')
    }
    catch(err) {
        setError(err.data.message);
    }
    }
    useEffect(()=> {

      const getUser = async() => {
        const config = {
          headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `${token}`
          }
       }
      const {data} = await axios.get('http://localhost:8000/api/v1/users/me2',config)
        setUser(data.data.user);
      }
      getUser();
    },[])
  return (
    <body>

<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

<div className="activation__wrapper">
  <div className="activation__container">
    <div className="activation__header"><img className="activation__logo" src={firstImage} /></div>
    {/* <div className="activation__arrow"></div> */}
    <div className="activation__message">
      <div> Dear, <span className="activation__user"></span>
        
        <br/>Thank you for choosing AMAN EPAYEMENTS.</div>
    </div>
    <div className="activation__link">
      <div>
        Click on the following link to activate your account:
      </div>
      <div href="http://localhost:8000/login" className="activation__btn" onClick={activateAccount}>Activate your account here</div>
    </div>

    <div className="control text-center mt-4">
                                   {error!==''?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>An Error Has occured please try again later </label>:<label></label>}
                                </div>
    <div className="activation__footer my-3">
      Thank you. Sincerely,
      <br/> Aman EPayements Team
      <br/>
    </div>
  </div>
</div>
</body>
  )
}

export default ActivationScreen