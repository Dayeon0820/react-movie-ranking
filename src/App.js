import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState({});
  const [budget, setBudget] = useState(0);
  const [result, setResult] = useState(0);
  const onChange = (event) => {
    setBudget(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setResult(Math.floor(budget / coin.quotes.USD.price));
  };
  const onselect = (event) => {
    const coin_id = event.target.value;
    const coin = coins.find((ele) => ele.id == coin_id);
    setCoin(coin);
  };
  useEffect(() => {
    console.log("Coin selected:", coin.name);
    console.log("Budget:", budget);
  }, [coin, budget]);
  useEffect(() => {
    console.log(result);
  }, [result]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <select onChange={onselect}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={budget}
              placeholder="your budget (USD)"
              type="number"
            />
            <button>submit</button>
          </form>
          <h2>
            you can buy {result} {coin.symbol}
          </h2>
        </>
      )}
    </div>
  );
}

export default App;
