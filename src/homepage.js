import React, { useState } from 'react';
import './homepage.css';

function CurrencyConverter() {
  const currencies = ['try', 'usd', 'eur'];

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('try');
  const [conversionResults, setConversionResults] = useState({});

  const fetchConversion = async (targetCurrency) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
      const data = await response.json();
      
      const conversionRate = data[fromCurrency][targetCurrency];
      if (conversionRate) {
        return (amount * conversionRate).toFixed(2);
      }
      return null;
    } catch (error) {
      console.error("Error fetching conversion data", error);
      return null;
    }
  };

  const handleExchange = async () => {
    const newResults = {};
    for (const currency of currencies) {
      if (currency !== fromCurrency) {
        const result = await fetchConversion(currency);
        newResults[currency] = result;
      }
    }
    setConversionResults(newResults); // Eski sonuçlar bellekte saklanmadan sadece yeni sonuçlar
  };

  const handleCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
    setConversionResults({}); // Belleği sıfırlıyoruz
  };

  return (
    <div className='maindiv'>
      <h1>Currency Converter</h1>
      
      <div className='operationdiv'>
        <label>From:</label>
        <select value={fromCurrency} onChange={handleCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleExchange}>Exchange</button>

      <div className="results-container">
        <h3>Converted Values:</h3>
        {currencies
          .filter(currency => currency !== fromCurrency)
          .map(currency => (
            <p key={currency}>
              {currency.toUpperCase()}: {conversionResults[currency] ? conversionResults[currency] : "..."}
            </p>
          ))}
      </div>
    </div>
  );
}

export default CurrencyConverter;
