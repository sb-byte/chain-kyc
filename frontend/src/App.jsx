import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import chainKYCData from './contracts/ChainKYC.json';
import Landing from './Landing';
import './index.css';

function App() {
  const [showApp, setShowApp] = useState(false);
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
      const reason = error.reason || error.message || "Unknown error";
      if (reason.includes("already registered")) {
        alert("You have already submitted your KYC data. Please wait for verification.");
      } else {
        alert("Error registering: " + reason);
      }
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
      const reason = error.reason || error.message || "Unknown error";
      alert("Error verifying: " + reason);
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

  if (!showApp) {
    return <Landing onLaunch={() => setShowApp(true)} />;
  }

  return (
    <div className="app-container">
      <header className="dashboard-header animate-slide-up">
        <div className="logo">CHAIN<span>KYC</span></div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {account && <span className="badge bg-white">Connected</span>}
          <button className="connect-btn animate-jiggle" onClick={connectWallet}>
            {account ? account.substring(0, 6) + "..." + account.substring(38) : "Connect Wallet"}
          </button>
        </div>
      </header>

      {account ? (
        <main className="dashboard">
          
          {/* Customer Panel - Hidden for Banks */}
          {!isBank && (
            <section className="glass-panel brutal-box animate-slide-up delay-1">
              <h2 className="panel-title">CUSTOMER PORTAL</h2>
              
              <div className="status-indicator">
                <span className="data-label">Status:</span>
                {customerInfo?.isVerified ? (
                  <span className="badge status-verified">VERIFIED</span>
                ) : customerInfo?.isRegistered ? (
                  <span className="badge status-pending" style={{backgroundColor: 'var(--accent)', color: 'var(--black)'}}>PENDING VERIFICATION</span>
                ) : (
                  <span className="badge status-unregistered" style={{backgroundColor: 'var(--black)', color: 'var(--white)'}}>NOT REGISTERED</span>
                )}
              </div>

              {customerInfo?.isRegistered && (
                <div className="data-row">
                  <span className="data-label">Document Hash:</span>
                  <span className="data-value" style={{wordBreak: 'break-all'}}>{customerInfo.dataHash}</span>
                </div>
              )}
              {customerInfo?.isVerified && (
                <div className="data-row">
                  <span className="data-label">Verified By:</span>
                  <span className="data-value" style={{wordBreak: 'break-all'}}>{customerInfo.verifier}</span>
                </div>
              )}

              {!customerInfo?.isRegistered && (
                <form onSubmit={registerCustomer} style={{marginTop: '2rem'}}>
                  <div className="form-group">
                    <label>KYC Document Hash (IPFS)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. QmHash123..."
                      value={kycHash}
                      onChange={(e) => setKycHash(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="action-btn animate-jiggle">
                    Submit KYC Data
                  </button>
                </form>
              )}
            </section>
          )}

          {/* Institution Panel - Hidden for Customers */}
          {isBank && (
            <section className="glass-panel brutal-box animate-slide-up delay-2">
              <h2 className="panel-title">INSTITUTION PORTAL</h2>
              <div className="badge authorized-bank" style={{marginBottom: '1rem'}}>AUTHORIZED BANK</div>
              <form onSubmit={verifyCustomer}>
                <div className="form-group">
                  <label>Customer Address to Verify</label>
                  <input 
                    type="text" 
                    placeholder="0x..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
                <button type="submit" className="action-btn success animate-jiggle">
                  Approve KYC
                </button>
              </form>
            </section>
          )}

        </main>
      ) : (
        <div className="glass-panel brutal-box animate-slide-up delay-1" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2 className="panel-title" style={{marginBottom: '1rem'}}>SECURE CONNECTION REQUIRED</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 500, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Please connect your MetaMask wallet to access the Decentralized Identity Verification Network.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
