"use client";

import { useGetCryptosQuery } from "@/services/cryptoApi";
import { Avatar, Paper } from "@mui/material";
import millify from "millify";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search,setSearch]=useState('')
  
  useEffect(()=>{
    
    const newData= data?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(newData)
  },[data,search])
  if (isFetching) return <Loader/>;

  return (
    <div>
      {!simplified &&(

        <div className="flex justify-center my-4">
        <input className="p-2 border md:w-1/3 w-10/12 border-blue-500 border-2 rounded-xl text-center" onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search Cryptocurrency" />
      </div>
        )}
      <div className="grid mt-4 grid-cols-1 md:grid-cols-3 gap-4 ">
        {cryptos?.map((currency) => (
          <Link key={currency.uuid} href={`/crypto/${currency.uuid}`}>
            <Paper className="py-5 px-8 w-10/12 mx-auto md:w-full" elevation={24}>
              <div className="flex justify-between">

              <div className="font-bold">
                {currency.rank}.{currency.name}
              </div>
              <Avatar>
                <Image height={100} width={100} src={currency.iconUrl} />
              </Avatar>
              </div>
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap :{millify(currency.marketCap)}</p>
              <p>Daily Change : {millify(currency.change)}%</p>
            </Paper>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
