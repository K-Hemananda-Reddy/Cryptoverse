"use client";

import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useGetCryptosQuery } from "@/services/cryptoApi";
import millify from "millify";
import Link from "next/link";
import CryptoCurrencies from "@/components/CryptoCurrencies";
import CryptoNews from "@/components/CryptoNews";
import Loader from "@/components/Loader";

export default function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader/>;
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="uppercase font-bold text-2xl tracking-wider text-center my-8">
        Global Crypto stats
      </div>
      <motion.div
        initial={{ y: 1000, scale: 0.2, opacity: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 divide-x-4 divide-y-4 text-sm md:text-xl gap-2 place-items-center w-10/12 md:w-2/5 md:gap-7"
      >
        <motion.div className="w-full" whileHover={{ scale: 1.2 }}>
          <Paper elevation={24}>
            <div className="  p-5 space-y-3 flex flex-col">
              <span className=" text-slate-500">Total Cryptocurrencies</span>
              <span className="font-semibold">{globalStats.total}</span>
            </div>
          </Paper>
        </motion.div>
        <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
          <Paper className="h-full" elevation={24}>
            <div className="  p-5 space-y-3 flex flex-col">
              <span className=" text-slate-500">Total Exchanges</span>
              <span className="font-semibold">
                {millify(globalStats.totalExchanges)}
              </span>
            </div>
          </Paper>
        </motion.div>
        <motion.div className="w-full" whileHover={{ scale: 1.2 }}>
          <Paper elevation={24}>
            <div className="  p-5 space-y-3 flex flex-col">
              <span className=" text-slate-500">Total Market Cap</span>
              <span className="font-semibold">
                {millify(globalStats.totalMarketCap)}
              </span>
            </div>
          </Paper>
        </motion.div>
        <motion.div className="w-full" whileHover={{ scale: 1.2 }}>
          <Paper elevation={24}>
            <div className="  p-5 space-y-3 flex flex-col">
              <span className=" text-slate-500">Total 24h Volume</span>
              <span className="font-semibold">
                {millify(globalStats.total24hVolume)}
              </span>
            </div>
          </Paper>
        </motion.div>
        <motion.div className="w-full h-full" whileHover={{ scale: 1.2 }}>
          <Paper className="h-full" elevation={24}>
            <div className="  p-5 space-y-3 flex flex-col">
              <span className=" text-slate-500">Total Markets</span>
              <span className="font-semibold">
                {millify(globalStats.totalMarkets)}
              </span>
            </div>
          </Paper>
        </motion.div>
      </motion.div>

      <div className="pt-5 border-t-2 w-full md:w-10/12 mx-auto mt-14 border-slate-500">
        <div className="flex mx-3 justify-between">
          <h1 className="md:text-3xl text-sm font-bold">
            Top 10 Cryptocurrencies in the world
          </h1>
          <Link
            href="/cryptocurrencies"
            className=" text-sm md:text-base md:font-bold text-blue-500 hover:decoration-4 hover:underline hover:underline-offset-4"
          >
            Show More
          </Link>
        </div>

        <CryptoCurrencies simplified={true} />
      </div>
      <div className="pt-5 border-t-2 w-full md:w-10/12 mx-auto mt-14 border-slate-500">
        <div className="mx-5 flex justify-between">
          <h1 className="md:text-3xl  font-bold">Latest Crypto News</h1>
          <Link
            href="/news"
            className="text-sm md:text-base md:font-bold text-blue-500 hover:decoration-4 hover:underline hover:underline-offset-4"
          >
            Show More
          </Link>
        </div>
      </div>
      <CryptoNews simplified/>
    </div>
  );
}
