"use client";

import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useGetCryptoDetailsQuery } from "@/services/cryptoApi";
import millify from "millify";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import { Autocomplete, Paper, TextField } from "@mui/material";
import LineChart from "@/components/LineChart";
import { useGetCryptoHistoryQuery } from "@/services/cryptoApi";
import Loader from "@/components/Loader";

const page = ({ params }) => {
  const {coinId}=params
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(params.coinId);
  const {data:coinHistory}=useGetCryptoHistoryQuery({coinId,timePeriod})
  console.log(data);
  if (isFetching) return <Loader/>;
  const cryptoDetails = data?.data?.coin;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails["price"])}`,
      icon: <CurrencyExchangeRoundedIcon />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <Looks3OutlinedIcon /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails["24hVolume"])}`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <MonetizationOnRoundedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <PaymentsOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <PaymentOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlinedIcon />
      ) : (
        <CloseOutlinedIcon />
      ),
      icon: <GppMaybeOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.supply.total)}`,
      icon: <GppMaybeOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.supply.circulating)}`,
      icon: <GppMaybeOutlinedIcon />,
    },
  ];

  return (
    <div>
      <div className="flex flex-col mt-5 space-y-5 justify-center items-center">
        <h1 className=" font-extrabold text-2xl text-blue-500">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </h1>
        <p className="text-sm md:w-full w-3/4 text-slate-500">
          {cryptoDetails.name} live prices in us dollars . View value statistics
          , market cap and supply
        </p>
      </div>
      <Autocomplete
      value={timePeriod}
        disablePortal
        id="combo-box-demo"
        options={time}
        onChange={(event, newValue) => {
          setTimePeriod(newValue);
        }}
        sx={{ width: 300 }}
        className="md:w-1/5 w-3/4 mx-auto my-5"
        renderInput={(params) => <TextField {...params} label="Time Period" />}
      />
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      <div className="flex my-4 space-y-4 md:flex-row flex-col justify-center items-center md:space-x-4">
        <div>
          <div className="flex flex-col space-y-3 items-center">
            <div className="font-bold text-xl">
              {cryptoDetails.name} Value Statistics
            </div>
            <div>An overview showing the stats of {cryptoDetails.name}</div>
          </div>

          <div className="my-4">
            {stats.map(({ icon, title, value }) => (
              <Paper
                elevation={4}
                className="flex p-3 mb-1 bg-slate-100 w-full hover:bg-white space-x-2  mx-auto  text-center"
              >
                <div>{icon}</div>
                <div>{title}</div>
                <div>{value}</div>
              </Paper>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col space-y-3 items-center">
            <div className="font-bold text-xl">Other Statistics</div>
            <div>An overview showing the stats of all cryptocurrencies</div>
          </div>

          <div className="my-4">
            {genericStats.map(({ icon, title, value }) => (
              <Paper
                elevation={4}
                className="flex p-3 mb-1 bg-slate-100 hover:bg-white space-x-2  mx-auto  text-center"
              >
                <div>{icon}</div>
                <div>{title}</div>
                <div>{value}</div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/3 mx-auto my-10 space-y-4">
        <h1 className="font-bold text-2xl">What is {cryptoDetails.name}</h1>
        <div>{HTMLReactParser(cryptoDetails.description)}</div>
      </div>
      <div className="md:w-2/3 w-4/5 mx-auto">
        <h1 className="font-bold text-center text-2xl">{cryptoDetails.name} Links</h1>
        <div className="my-5">
          {cryptoDetails.links.map((link)=>(
            <Paper className="flex font-bold justify-between mx-auto w-full md:w-1/2 p-5 bg-slate-50 hover:bg-white">
              <div>{link.type}</div>
              <a href={link.url} className="text-blue-400" target="_blank">{link.name}</a>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
