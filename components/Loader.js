import React from 'react'

import im from '../images/849.gif'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <Image src={im} height={100} width={100} alt='loaderyty'/>
    </div>
  )
}

export default Loader