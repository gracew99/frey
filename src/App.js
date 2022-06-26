import './App.css';
import { useEthers, useCall } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { useState } from "react"
import styled from 'styled-components';
import axios from 'axios';
const punkdom = [
  "function getDefaultDomain(address _addr, string calldata _tld) public view returns(string memory)",
  "function getDefaultDomains(address _addr) public view returns(string memory)",
  "function getDomainHolder(string calldata _domainName, string calldata _tld) public view returns(address)",
  "function getDomainData(string calldata _domainName, string calldata _tld) public view returns(string memory)"
]

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  font-size: 1em;
  padding: 2%;
`

function useDefaultDomain(
  account,
  tld
) {
  const { value, error } =
    useCall(
         {
          contract: new Contract("0xC17E9347Ce26D7630A98eC4158Bd7200E54bf4Cd", punkdom), // instance of called contract
          method: "getDefaultDomain", // Method to be called
          args: [account, tld], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if(error) {
    console.error(error.message)
    return undefined
  }
  return value?.[0]
}
function useDefaultDomains(
  account
  ) {
    const { value, error } =
      useCall(
           {
            contract: new Contract("0xC17E9347Ce26D7630A98eC4158Bd7200E54bf4Cd", punkdom), // instance of called contract
            method: "getDefaultDomains", // Method to be called
            args: [account], // Method arguments - address to be checked for balance
          }
      ) ?? {};
    if(error) {
      console.error(error.message)
      return undefined
    }
    return value?.[0].split("freytest")[0]+ "freytest; " + value?.[0].split("freytest")[1]
  }
  function useDomainHolder(
    domain
    ) {
      const { value, error } =
        useCall(
             {
              contract: new Contract("0xC17E9347Ce26D7630A98eC4158Bd7200E54bf4Cd", punkdom), // instance of called contract
              method: "getDomainHolder", // Method to be called
              args: [domain, ".freytest"], // Method arguments - address to be checked for balance
            }
        ) ?? {};
      if(error) {
        console.error(error.message)
        return undefined
      }
      return value?.[0]
    }
    function useDomainData(
      domain
      ) {
        const { value, error } =
          useCall(
               {
                contract: new Contract("0xC17E9347Ce26D7630A98eC4158Bd7200E54bf4Cd", punkdom), // instance of called contract
                method: "getDomainData", // Method to be called
                args: [domain, ".freytest"], // Method arguments - address to be checked for balance
              }
          ) ?? {};
        if(error) {
          console.error(error.message)
          return undefined
        }
        return value?.[0]
      }

function App() {
  
  const { activateBrowserWallet, account, chainId } = useEthers()
  const defaultDomain = useDefaultDomain(account, ".freytest")
  const defaultTPDomain = useDefaultDomain(account, ".testpoly")
  const defaultDomains = useDefaultDomains(account)
  const [checkDomain, setCheckDomain] = useState("")
  const [checkSubmitDomain, setCheckSubmitDomain] = useState("")
  const domainHolder = useDomainHolder(checkSubmitDomain)
  const domainData = useDomainData(checkSubmitDomain)
  const [transcript, setTranscript] = useState("")


  async function submitAudio() {
    const url = "http://localhost:8000/audio";
    console.log("OK")
    await axios.post(url).then((result) => {
      setTranscript(result.data.transcript)
    })
  }
  function onChange(event) {
    setCheckDomain(event.target.value)
    console.log(event.target.value)
  }
  function onSubmit() {
    setCheckSubmitDomain(checkDomain)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> PunkWallet </h1>
        <br></br>
        <iframe frameborder="0" scrolling="no"  width="20%" height="500px" src="https://api.echo3D.co/webar?key=hidden-tree-0757&entry=5896c499-0e0d-4eb0-8daa-9b1ecf49a426"/>
        <br></br>
        <Button variant="primary" onClick={() => activateBrowserWallet()}>Connect</Button>
        {account && <p>Account: {account}</p>}
        {account && chainId && <p>chain: {chainId}</p>}
        {account&& defaultDomain && <p>Default Freytest Domain: {defaultDomain}</p> }
        {account&& defaultDomain && <p>Default Testpoly Domain: {defaultTPDomain}</p> }
        {account&& defaultDomains && <p>Default Domains: {defaultDomains}</p> }
        {account && <p>Check Domain Owner: </p>}
        {account && <input onChange={onChange}></input>}
        <br></br>
        {account && <input type="submit" onClick={onSubmit} value="Submit"/>}

        {account&& domainHolder && <p>DomainHolder: {domainHolder}</p> }
        {account && domainHolder && <button onClick={submitAudio} > Audio </button>}
        {account && domainHolder && <p>{transcript}</p>}
        {account && domainHolder === account && <p> You are the domain holder</p>}
        {account && domainHolder !== account && <p> You are not the domain holder</p>}
        {account&& domainData && <p>DomainData:</p> }
        {account && domainData && <img style={{width: "15%"}} src={JSON.parse(domainData).imgAddress}></img>}
      </header>
    </div>
  );
}

export default App;
