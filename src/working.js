import './App.css';
import { useEthers } from '@usedapp/core';

const shortenAddress = (addr) => `${addr.slice(0, 5)}...${addr.slice(-4)}`;

const App = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  return (
    <div className='container'>
      <h2>
        {!account ? "Please connect your wallet." : `Connected Wallet: ${shortenAddress(account)}`}
      </h2>
      {!account ? (
        <button className="button connect" onClick={() => activateBrowserWallet()}>
          Connect
        </button>
      ) : (
        <button className="button disconnect" onClick={() => deactivate()}>
          Disconnect
        </button>
      )}
    </div>
  );
}

export default App;