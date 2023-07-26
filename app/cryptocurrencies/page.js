'use client'
import { useGetCryptosQuery } from "@/services/cryptoApi";
import CryptoCurrencies from '@/components/CryptoCurrencies'
import React from 'react'

const page = () => {
  return (
    <CryptoCurrencies />
  )
}

export default page