import React, { useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,
Title,
Tooltip,
LineElement,
Legend ,
CategoryScale,
LinearScale,
PointElement,
Filler} from 'chart.js';
ChartJS.register(
  Title,
Tooltip,
LineElement,
Legend ,
CategoryScale,
LinearScale,
PointElement,
Filler
)

const Linegraph = () => {
  const [data,setData]= useState({
    labels:["jan","feb","mar","apr","may","june","july"],
    datasets:[{
      label:"First Data Set",
      data:[10,20,30,40,50,80,90],
      borderColor:'brown',
      tension:0.4,
      pointStyle:"rect",
      fill:true,
      pointBorderColor:"red"
    }]
  });
  
  return (
    <div className='App' style={{height:'500px' ,width:'800px'}}><Line data={data} /></div>
  )
}

export default Linegraph;