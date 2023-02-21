import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarGraph = () => {
  const [chartData, setChartData] = useState({});
  const [search, setSearch] = useState('bitcoin');
  const [days, setDays] = useState('365');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${search}/market_chart?vs_currency=usd&days=${days}`, {
          cancelToken: cancelToken.token
        });
        const json = await result.data;
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
                lineTension:0.4,
                fill:true,
                pointBorderColor:"none"
              },
            ],
          });
        } 
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled');
        } else {
          setError(err);
        }
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, [search,days]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="graph-container">
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
    <div className="chart-container">
      <Bar data={chartData} 
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
    </div>
    : null
  }
</div>
);
};

export default BarGraph;