import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const CoinLineGraph = () => {
  const [chartData, setChartData] = useState({});
  const [search, setSearch] = useState('bitcoin');
  const [days, setDays] = useState('365');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://api.coingecko.com/api/v3/coins/${search}/market_chart?vs_currency=usd&days=${days}`);
      const json = await result.json();
      if(json.prices) {
        const labels = json.prices.map(price => new Date(price[0]).toLocaleDateString());
        const prices = json.prices.map(price => price[1]);
        let color="";
        if(prices[0]>prices[prices.length-1]) {
          color = 'red'
        } else {
          color = 'green'
        }

        setChartData({
          labels,
          datasets: [
            {
              label: `${search} Price (USD)`,
              data: prices,
              borderColor: color,
              tension:0.4,
              fill:true,
      pointBorderColor:"none"
            },
          ],
        });
      } 
    };
    fetchData();
  }, [search,days]);

  return (
         <div className='bg-white border-2 border-gray rounded mx-auto' style={{height:'500px',width:'900px'}}>
         <form className='flex flex-col justify-center items-center'>
         <select className='bg-red-400 border-2 border-white py-2 px-3 hover:bg-red-500 rounded-md w-full' value={search} onChange={e => setSearch(e.target.value)}>
         <option value="bitcoin">Bitcoin</option>
         <option value="ethereum">Ethereum</option>
         <option value="litecoin">Litecoin</option>
          <option value="ripple">Ripple</option>
          <option value="bitcoin-cash">Bitcoin Cash</option>
          <option value="tether">Tether</option>
        </select>
        <select className="bg-white border-2 border-blue-500 py-2 px-3 rounded-md w-full" value={days} onChange={e => setDays(e.target.value)}>
<option value="1">1 Day</option>
<option value="7">7 Days</option>
<option value="30">30 Days</option>
<option value="365">365 Days</option>
</select>
      </form>
      { chartData.labels && chartData.labels.length > 0 ? 
          <Line className="w-full h-64 bg-red-50 shadow-md rounded border-2 border-gray-500"  data={chartData} 
              options={{
                scales: {
                  xAxes: [{
                    type: 'time',
                    time: {
                      displayFormats: {
                        quarter: 'MMM YYYY'
                      }
                    },
                    distribution: 'series'
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Price (USD)'
                    }
                  }]
                }
              }}
            /> 
          : null
        }
      </div>
    );
  };
  export default CoinLineGraph;