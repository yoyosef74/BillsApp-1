import React from 'react'
const img = require('./imgs/images.png')
const WaitingScreen = () => {
  return (
    <div id='wrapper' className='waiting text-center' >

        <div className='waitingText'>Thank You for signing up with AMAN  E-PAYEMENTS billings services, we are currently proccessing and verifying your data, we will respond by an email
            to activate your account as soon as possible.Please check your email regulary.
        </div>
        <img height={'30%'} src={img} alt=''></img>
    </div>
  )
}

export default WaitingScreen