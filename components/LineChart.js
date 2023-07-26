import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';




const LineChart = ({coinHistory,currentPrice,coinName}) => {
    Chart.register(...registerables);
    
    const coinPrice=[]
    const coinTimeStamp=[]
    for(let i=0;i<coinHistory?.data?.history?.length;i+=1){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data={
        labels:coinTimeStamp,
        datasets:[
            {label:'Price in USD',
            data:coinPrice,
            dill:false,
            backgroundColor:"#0071bd",
            borderColor:"#0071bd",
        }
        ]
    }

    const options={
        aspectRatio:1,
        scales:{
            yAxes:[
                {
                    ticks:{
                        beginAtZero:true
                    }
                }
            ]
        }
    }

  return (
    <div>
        <div className='md:flex md:w-2/3 w-4/5 mx-auto justify-between my-8'>

        <div className='text-2xl text-blue-500 font-bold'>{coinName} Price Chart</div>
        <div className='flex space-x-5 font-bold'>

        <div>{coinHistory?.data?.change}%</div>
        <div>Current {coinName} Price : $ {currentPrice}</div>
        </div>
        </div>

        <div className='md:w-2/3 w-5/6  mx-auto'>


    <Line  data={data} options={options}/>
        </div>
    </div>
  )
}

export default LineChart