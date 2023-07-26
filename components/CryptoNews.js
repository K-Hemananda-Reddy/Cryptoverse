import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "@/services/cryptoNewsApi";
import { Autocomplete, Avatar, Paper, TextField } from "@mui/material";
import Image from "next/image";
import crpimg from "../images/img.png";
import moment from "moment/moment";
import { useGetCryptosQuery } from "@/services/cryptoApi";

const CryptoNews = ({ simplified }) => {
    const [category,setCategory]=useState('Cryptocurrency')
    const { data} = useGetCryptosQuery(100);
    const names=data?.data?.coins.map((i)=>{return i.name})
    const [inputValue, setInputValue] =useState('');
  
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: category,
    count: simplified ? 6 : 12,
  });
  if (isFetching) return "Loading...";
  return (
    <div>
      {!simplified && (
        <div className="flex justify-center m-5">
          <Autocomplete
          value={category}
            disablePortal
            id="combo-box-demo"
            onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
            options={names}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select a Crypto" />}
          />
        </div>
      )}
      <div className="my-5 grid grid-cols-1 md:grid-cols-3 gap-5 w-10/12 mx-auto">
        {cryptoNews?.value.map((news, i) => (
          <a target="_blank" key={i} href={news.url}>
            <Paper className="p-5 text-sm h-full w-full space-y-3" elevation={24}>
              <div className="flex space-x-5">
                <div className="font-semibold">{news.name}</div>
                <Image
                  src={news?.image?.thumbnail?.contentUrl || crpimg}
                  height={100}
                  width={100}
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="flex items-center justify-between space-x-3">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <Image
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl || crpimg
                      }
                      height={70}
                      width={70}
                    />
                  </Avatar>
                  <div className="text-sm">{news.provider[0]?.name}</div>
                </div>
                <div className="text-sm">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </div>
              </div>
            </Paper>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
