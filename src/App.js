import React from 'react'
import './input.css'
import CoinLineGraph from './CoinLineGraph'
import Linegraph from './Linegraph'
import BarGraph from './Bargraph'

const App = () => {
  return (
    <div>
      <Linegraph/>
     <CoinLineGraph/>
 <BarGraph/>
    </div>
  )
}

export default App
