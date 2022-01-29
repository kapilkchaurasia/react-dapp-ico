import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import RandallCoin from './artifacts/contracts/RandallCoin.sol/RandallCoin.json'

const randallCoinAddress = "0x87da6e3945F27cF04A85262C34d7923E41C1F9b4"

function App() {
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  const [amount, setAmount] = useState()
  
  async function mint() {
    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log({ account })
      const signer = provider.getSigner()
      let contract = new ethers.Contract(randallCoinAddress, RandallCoin.abi, signer)
      const transaction = await contract.mine({value: ethers.utils.parseEther(amount)})
      await transaction.wait()
    } catch(err){
      console.log("Error: ", err)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p><b>Mint RandallCoin</b></p>
        <button onClick={mint}>Enter the Eth value</button>
        <input onChange={e => setAmount(e.target.value)} placeholder=".001" />
      </header>
    </div>
  );
}

export default App;
