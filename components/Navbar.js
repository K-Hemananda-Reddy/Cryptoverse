
'use client'
import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [toggleNav,setToggleNav]=useState(false)
  return (
    <div className="sticky top-0 z-20">
      <div className="bg-black  text-white flex justify-between items-center space-x-3 px-8 py-5">
        <div className="flex space-x-4 items-center">
        <motion.div animate={{ rotate: 360 }}
  transition={{ ease:"linear", repeat: Infinity, duration: 2 }}>

        <Avatar className="bg-black">
          <Image height={100} width={100} src="/cryptocurrency.png" />
        </Avatar>
        </motion.div>
        <motion.h1 whileHover={{opacity:0.9}} className="text-xl font-bold tracking-widest uppercase">
          <Link href="/">CryptoVerse</Link>
        </motion.h1>
        </div>
        <div className="hidden md:flex  space-x-10 text-lg tracking-wider">
            <Link  href="/"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>Home</motion.div></Link>
            <Link href="/cryptocurrencies"> <motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}> Cryptocurrencies</motion.div></Link>
            <Link href="/exchanges"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>Exchanges</motion.div></Link>
            <Link href="/news"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>News</motion.div></Link>
        </div>
        <div onClick={()=>{setToggleNav((prev)=>!prev)}} className="sm:hidden">
            <MenuIcon/>
        </div>
      </div>
      <div>
        {toggleNav &&<div className="text-center sm:hidden space-y-1 bg-black text-white">
          <hr />
          <Link onClick={()=>setToggleNav(false)}  className="p-3" href="/"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>Home</motion.div></Link>
          <hr />
            <Link onClick={()=>setToggleNav(false)} className="p-3" href="/cryptocurrencies"> <motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}> Cryptocurrencies</motion.div></Link>
            <hr />
            <Link onClick={()=>setToggleNav(false)} className="p-3" href="/exchanges"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>Exchanges</motion.div></Link>
            <hr />
            <Link onClick={()=>setToggleNav(false)} className="p-3" href="/news"><motion.div whileHover={{scale:1.5}} whileTap={{scale:0.8}}>News</motion.div></Link>
            <hr />
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
