# CHAINKYC: Decentralized Identity Verification Network

![Neo-Brutalist Design](https://img.shields.io/badge/Design-Neo--Brutalism-ff4d4d?style=for-the-badge)
![Ethereum](https://img.shields.io/badge/Network-Sepolia_Testnet-1a4bfa?style=for-the-badge)
![Solidity](https://img.shields.io/badge/Contract-Solidity_0.8.20-black?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React_+_Vite-white?style=for-the-badge&logo=react)

**ChainKYC** is a blockchain-based KYC (Know Your Customer) validation system designed to prevent data duplication, enhance security through immutable ledgers, and drastically reduce compliance overhead for global institutions. 


---

## 🚀 Live Deployment Information

The smart contract is actively deployed on the **Ethereum Sepolia Testnet**.

*   **Contract Address:** `0xae10fb61F4e321974ce1b8e7A5a24cBb1D988430`
*   **Network:** Sepolia Testnet (Chain ID: `11155111`)

### 🔍 How to Track Transactions
All interactions with the DApp (like registering as a customer or verifying users as a bank) are permanently recorded on the blockchain. 
You can track all activity, internal transactions, and gas fees in real-time by pasting the contract address or your wallet address into **Etherscan**:

👉 **[View Contract on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xae10fb61F4e321974ce1b8e7A5a24cBb1D988430)**

---

## 🎯 System Goals & Metrics

*   **80% Reduction** in manual compliance costs.
*   **<5 Minute** average approval time.
*   **100% On-Chain** auditable history.
*   **Zero-Knowledge Architecture:** IPFS Document hashes are stored on-chain; sensitive raw data is never exposed to the public ledger.

---

## ⚙️ Architecture & Flow

### 1. Customer Upload
A user connects their Web3 Wallet (MetaMask), securely hashes their personal identification documents locally, and uploads the cryptographic hash (CID) to the Smart Contract.
### 2. Institution Review
An authorized **Tier-1 Bank** accesses their restricted portal via Role-Based Access Control (RBAC), reviews the off-chain document securely, and verifies the identity.
### 3. Cryptographic Stamp
The Bank executes a smart contract function, permanently stamping the user's blockchain address as "Verified."
### 4. Global Trust Execution
Secondary institutions (like crypto exchanges or lenders) can programmatically query the blockchain. If the user's address has the cryptographic stamp, they trust it instantly without asking for the user's documents again.

---

## 🛠️ Local Development & Setup

### Prerequisites
*   Node.js (v18+)
*   MetaMask Browser Extension
*   Alchemy or Infura RPC URL for Sepolia

### 1. Clone & Install
```bash
git clone https://github.com/sb-byte/chain-kyc.git
cd chain-kyc
npm install
cd frontend && npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
SEPOLIA_RPC_URL="your-alchemy-sepolia-rpc-url"
PRIVATE_KEY="your-deployer-wallet-private-key"
```

### 3. Running the Frontend
The frontend is built with Vite for lightning-fast HMR.
```bash
cd frontend
npm run dev
```

### 4. Adding a Bank Role (RBAC)
To test the "Institution Portal", your wallet must be authorized by the contract owner. Run this script locally to whitelist a bank address:
```bash
BANK_ADDRESS=0xYourWalletAddressHere npx hardhat run scripts/addBank.js --network sepolia
```

---
*Built securely on Ethereum.*
