import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import chainKYCData from './contracts/ChainKYC.json';
import './index.css';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  
  // Forms
  const [kycHash, setKycHash] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  // Data display
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isBank, setIsBank] = useState(false);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const kycContract = new ethers.Contract(
          chainKYCData.address,
          chainKYCData.abi,
          signer
        );
        
        setContract(kycContract);
        
        // Check if the connected account is a bank
        try {
          const bankStatus = await kycContract.banks(accounts[0]);
          setIsBank(bankStatus);
        } catch (e) {
          console.error("Error checking bank status:", e);
        }
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this app!");
    }
  };

  const registerCustomer = async (e) => {
    e.preventDefault();
    if (!contract || !kycHash) return;
    
    try {
      const tx = await contract.registerCustomer(kycHash);
      await tx.wait();
      alert("Successfully registered KYC data!");
      setKycHash('');
      checkMyStatus();
    } catch (error) {
      console.error(error);
      alert("Error registering. See console for details.");
    }
  };

  const verifyCustomer = async (e) => {
    e.preventDefault();
    if (!contract || !customerAddress) return;
    
    try {
      const tx = await contract.verifyKYC(customerAddress);
      await tx.wait();
      alert("Customer successfully verified!");
      setCustomerAddress('');
    } catch (error) {
      console.error(error);
      alert("Error verifying. Are you an authorized bank?");
    }
  };

  const checkMyStatus = async () => {
    if (!contract || !account) return;
    try {
      const status = await contract.checkVerificationStatus(account);
      setCustomerInfo({
        isVerified: status[0],
        verifier: status[1]
      });
    } catch (error) {
      console.error("Could not fetch status:", error);
    }
  };

  useEffect(() => {
    if (account && contract) {
      checkMyStatus();
    }
  }, [account, contract]);

  return (
    <div className="app-container">
      <header className="animate-fade-in">
        <div className="logo">ChainKYC</div>
        <button className="connect-btn" onClick={connectWallet}>
          {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Connect Wallet'}
        </button>
      </header>

      <main className="dashboard animate-fade-in delay-1">
        {/* Customer Portal */}
        <div className="glass-panel">
          <h2 className="panel-title">Customer Portal</h2>
          
          <div className="data-row">
            <span className="data-label">Status</span>
            {customerInfo ? (
              <span className={`badge ${customerInfo.isVerified ? 'verified' : 'pending'}`}>
                {customerInfo.isVerified ? 'Verified' : 'Pending Verification'}
              </span>
            ) : (
              <span className="badge pending">Not Registered</span>
            )}
          </div>
          
          {customerInfo && customerInfo.isVerified && (
            <div className="data-row">
              <span className="data-label">Verified By</span>
              <span className="data-value" title={customerInfo.verifier}>
                {`${customerInfo.verifier.substring(0, 8)}...`}
              </span>
            </div>
          )}

          <form onSubmit={registerCustomer} style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>KYC Document Hash (IPFS CID)</label>
              <input 
                type="text" 
                value={kycHash}
                onChange={(e) => setKycHash(e.target.value)}
                placeholder="Qm..."
                required
              />
            </div>
            <button type="submit" className="action-btn">Submit KYC Data</button>
          </form>
        </div>

        {/* Bank / Institution Portal */}
        <div className="glass-panel animate-fade-in delay-2">
          <h2 className="panel-title">Institution Portal</h2>
          
          {isBank && <div className="badge authorized-bank">Authorized Bank</div>}
          
          <form onSubmit={verifyCustomer}>
            <div className="form-group">
              <label>Customer Address to Verify</label>
              <input 
                type="text" 
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>
            <button type="submit" className="action-btn success">Approve KYC</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
