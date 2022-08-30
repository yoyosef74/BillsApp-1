import axios from 'axios'
import React, {useState} from 'react'
import {
    useNavigate,
  useParams
} from "react-router-dom";

const ActivationScreen = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [error, setError] = useState('');
    const activateAccount = async() =>{
        try{
        await axios.post(`http://localhost:8000/api/v1/users/activate/${token}`);
        navigate('/login')
    }
    catch(err) {
        setError(err.data.message);
    }
    }
  return (
    <body>

<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

<div className="activation__wrapper">
  <div className="activation__container">
    <div className="activation__header"><img className="activation__logo" src="http://hortonworks.com/wp-content/uploads/2013/10/Fusionex-Logo-New.png" /></div>
    <div className="activation__subject">Fusionex GIANT Activation Link</div>
    <div className="activation__arrow"></div>
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
                                   {error!==''?<label className='m-auto text-center' variant="danger" style={{color: 'red',fontSize:'large'}}>{error} </label>:<label></label>}
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