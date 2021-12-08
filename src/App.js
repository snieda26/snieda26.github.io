import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from './components/Coin';

import './App.css';

function App() {

  const [coins, setCoins] = useState([])
  const [value, setValue] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
      setCoins(res.data)
    })
  }, [])

  const onChangeValue = e => {
    setValue(e.target.value)
  }

  const filteredCoins = coins.filter(coin => {
    return coin.name.toLowerCase().startsWith(value.toLocaleLowerCase())
  })
  return (
    <div className="coin-app">
      <div className="coin-search">
        <p className="coin-text">SniedaCrypto</p>
        <input className="coin-input" type="text" placeholder="search..." onChange={onChangeValue} />
      </div>


      {
        filteredCoins.map(obj => {
          return <Coin name={obj.name}
            image={obj.image}
            price={obj.current_price}
            key={obj.id}
            priceChange={obj.price_change_percentage_24h.toFixed(2)}
            symbol={obj.symbol}
            volume={obj.total_volume}
            marketcap={obj.market_cap}
            name={obj.name}
          />
        })
      }

    </div>
  );
}

export default App;
