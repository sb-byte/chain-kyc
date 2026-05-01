import React from 'react';
import './index.css';

function Landing({ onLaunch }) {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="brutal-nav">
        <div className="logo-text">CHAINKYC</div>
        <button className="brutal-btn-nav" onClick={onLaunch}>
          Launch Dashboard
        </button>
      </nav>

      {/* Hero Section exactly like VCR Reference */}
      <header className="vcr-hero">
        <div className="vcr-content">
          <div className="vcr-badge">SYSTEM OVERVIEW</div>
          
          <h1 className="vcr-title">
            <span className="title-line">DECENTRALIZED</span>
            <span className="title-line">
              <span className="vcr-pill pill-yellow">
                IDENTITY
              </span>
            </span>
            <span className="title-line">
              VERIFICATION 
              <span className="vcr-pill pill-blue">NETWORK</span>
            </span>
          </h1>
          
          <p className="vcr-desc">
            A blockchain-based KYC validation system designed to prevent data duplication, enhance security through immutable ledgers, and drastically reduce compliance overhead for global institutions.
          </p>
          
          <button className="vcr-btn" onClick={onLaunch}>
            ACCESS DASHBOARD
          </button>
        </div>
        
        {/* Floating Abstract Shapes */}
        <div className="shape-layer">
          <div className="vcr-shape shape-1"></div>
          <div className="vcr-shape shape-2"></div>
          <div className="vcr-shape shape-3">★</div>
        </div>
      </header>

      {/* Marquee Tape */}
      <div className="brutal-marquee">
        <div className="marquee-content">
          <span>80% COST REDUCTION &bull;</span>
          <span className="white-text">&lt;5 MIN VERIFICATION &bull;</span>
          <span>100% ON-CHAIN &bull;</span>
          <span className="white-text">SECURE &bull; IMMUTABLE &bull;</span>
          <span>ZERO KNOWLEDGE &bull;</span>
          <span className="white-text">DECENTRALIZED &bull;</span>
          <span>80% COST REDUCTION &bull;</span>
        </div>
      </div>

      {/* Success Metrics */}
      <section className="metrics-section">
        <div className="metric-box">
          <div className="metric-num">80%</div>
          <div className="metric-label">Reduction in Compliance Costs</div>
        </div>
        <div className="metric-box" style={{backgroundColor: 'var(--white)'}}>
          <div className="metric-num" style={{color: 'var(--black)'}}>&lt;5 MIN</div>
          <div className="metric-label" style={{color: 'var(--black)'}}>Average Approval Time</div>
        </div>
        <div className="metric-box">
          <div className="metric-num">100%</div>
          <div className="metric-label">On-Chain Auditability</div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="content-section bg-white">
        <h2 className="section-title">PROBLEM STATEMENT</h2>
        <div className="problem-box">
          Traditional KYC (Know Your Customer) processes are highly inefficient, siloed, and prone to severe data breaches. Customers must repeatedly submit sensitive personal documents to every new institution they join, while institutions spend billions annually on redundant verification overhead.
        </div>
      </section>

      {/* Goals & Objectives Grid */}
      <section className="content-section">
        <h2 className="section-title">GOALS & OBJECTIVES</h2>
        <div className="grid-6">
          <div className="goal-card">
            <div className="goal-num">01</div>
            <h3>Reduce KYC Redundancy</h3>
            <p>Customers upload their verified documents once and share the cryptographic proof securely.</p>
          </div>
          <div className="goal-card">
            <div className="goal-num">02</div>
            <h3>Eliminate Data Silos</h3>
            <p>Protect against massive centralized honeypot breaches using decentralized IPFS storage.</p>
          </div>
          <div className="goal-card">
            <div className="goal-num">03</div>
            <h3>Instant Verification</h3>
            <p>Secondary institutions query the Smart Contract to instantly trust a previous identity stamp.</p>
          </div>
          <div className="goal-card">
            <div className="goal-num">04</div>
            <h3>Regulatory Compliance</h3>
            <p>Maintain full GDPR compliance through a Zero-Knowledge architectural approach.</p>
          </div>
          <div className="goal-card">
            <div className="goal-num">05</div>
            <h3>Immutable Audit Trail</h3>
            <p>Provide regulators with a transparent, unforgeable history of all verification events.</p>
          </div>
          <div className="goal-card">
            <div className="goal-num">06</div>
            <h3>Cost Reduction</h3>
            <p>Cut manual compliance labor costs by over 80% across the financial sector.</p>
          </div>
        </div>
      </section>

      {/* System Flow */}
      <section className="content-section bg-white">
        <h2 className="section-title">SYSTEM FLOW</h2>
        <div className="flow-container">
          <div className="flow-step">
            <div className="flow-num">1</div>
            <div className="flow-text">
              <h3>Customer Upload</h3>
              <p>User connects Web3 Wallet (MetaMask) and submits their encrypted KYC document hash to the blockchain.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">2</div>
            <div className="flow-text">
              <h3>Institution Review</h3>
              <p>An authorized Tier-1 Bank accesses their restricted portal, reviews the raw document off-chain, and verifies identity.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">3</div>
            <div className="flow-text">
              <h3>Cryptographic Stamp</h3>
              <p>The Bank executes a Smart Contract function, permanently stamping the user's blockchain address as "Verified".</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="flow-num">4</div>
            <div className="flow-text">
              <h3>Global Trust Execution</h3>
              <p>Secondary institutions query the blockchain. If the identity is stamped, they trust it instantly without requesting raw documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Requirements Table */}
      <section className="content-section">
        <h2 className="section-title">FEATURE REQUIREMENTS</h2>
        <table className="brutal-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Feature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F1</td>
              <td><strong>Customer Portal</strong></td>
              <td>Frontend interface for users to connect wallets and hash their documents.</td>
            </tr>
            <tr>
              <td>F2</td>
              <td><strong>Institution Dashboard</strong></td>
              <td>RBAC restricted view for Tier-1 banks to query, review, and approve KYC.</td>
            </tr>
            <tr>
              <td>F3</td>
              <td><strong>Smart Contract Logic</strong></td>
              <td>Core Solidity backend tracking `isVerified` mapping and authorized bank roles.</td>
            </tr>
            <tr>
              <td>F4</td>
              <td><strong>Inter-Institutional Query</strong></td>
              <td>Secondary APIs for other protocols to verify user status programmatically.</td>
            </tr>
            <tr>
              <td>F5</td>
              <td><strong>Zero Knowledge Architecture</strong></td>
              <td>Ensuring only hashes exist on-chain; no PII touches the public ledger.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="brutal-footer">
        <div className="footer-logo">CHAIN<span style={{color: 'var(--accent)'}}>KYC</span></div>
        <button className="brutal-btn-nav" onClick={onLaunch}>ENTER DAPP &rarr;</button>
      </footer>
    </div>
  );
}

export default Landing;
