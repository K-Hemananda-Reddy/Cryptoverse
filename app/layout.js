'use client'

import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/store'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

 const metadata = {
  title: 'CryptoVerse',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <Script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9716041141351749' crossOrigin='anonymous'/>
      <Script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9716041141351749' crossOrigin='anonymous'/>
    <html lang="en">
      <body className={inter.className}>

        <Navbar/>
        {children}</body>
    </html>
    </Provider>
  )
}
