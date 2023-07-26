'use client'

import React from 'react'

import { useGetCryptoNewsQuery } from '@/services/cryptoNewsApi'
import CryptoNews from '@/components/CryptoNews'

const page = () => {
 
  return (
    <CryptoNews/>
  )
}

export default page