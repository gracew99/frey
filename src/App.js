import logo from './logo.svg';
import './App.css';
import { useEthers } from '@usedapp/core'

function App() {
  
  const { activateBrowserWallet, account, chainId } = useEthers()

  return (
    <div className="App">
      <header className="App-header">
  
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        {account && <p>Account: {account}</p>}
        {chainId && <p>chain: {chainId}</p>}
      </header>
    </div>
  );
}

export default App;
