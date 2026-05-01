# ChainKYC System

A decentralized KYC (Know Your Customer) verification system built with Solidity, Hardhat, React, and Vite. This system allows customers to securely upload their KYC data to the blockchain, where it can be verified by authorized banks and checked by other institutions.

## Features

*   **Customer Portal**: Customers can register and upload a hash (e.g., IPFS CID) of their KYC documents.
*   **Institution/Bank Portal**: Authorized banks can review and approve a customer's KYC status on-chain.
*   **Immutable Records**: All verification stamps are recorded transparently on the blockchain.
*   **Beautiful UI**: A striking neo-brutalism design built with React, featuring bold colors and stark contrasting borders.

---

## 🚀 Prerequisites

1.  **Node.js**: Make sure you have Node.js installed (v18 or v20 recommended).
2.  **MetaMask**: Install the [MetaMask extension](https://metamask.io/) in your browser.

---

## 🛠️ Phase 1: Setup & Launch

You need three separate terminals to run the full stack locally. 

### 1. Start the Local Blockchain

Open a terminal, navigate to the root of the project (`KYC-web3`), and start the local Hardhat node:

```bash
npx hardhat node
```

This will start a local Ethereum network and give you test accounts with 10,000 fake ETH each. **Keep this terminal running.**

### 2. Deploy the Smart Contracts

Open a **second** terminal, navigate to the root of the project (`KYC-web3`), and deploy the smart contract to your local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

*This will automatically copy the necessary contract ABIs over to the React frontend.*

### 3. Start the Frontend Application

Open a **third** terminal, navigate into the `frontend` folder, and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

Your app should now be running at **http://localhost:5173/**. Open this in your browser.

---

## 🦊 Phase 2: Wallet & Role Setup

To interact with the app and simulate both a Bank and a Customer, you need to connect your MetaMask wallet to your local Hardhat network.

### Connect MetaMask to Localhost
1.  Open MetaMask and click on the network dropdown at the top.
2.  Click **Add network** -> **Add a network manually**.
3.  Fill in the details:
    *   **Network Name**: Hardhat Local
    *   **New RPC URL**: `http://127.0.0.1:8545`
    *   **Chain ID**: `31337`
    *   **Currency Symbol**: `ETH`
4.  Save and switch to this network.

### Import Two Test Accounts
You need two accounts: **Account A** (The Bank) and **Account B** (The Customer).
1.  In your first terminal (running `npx hardhat node`), copy the **Private Key** of `Account #0` and `Account #1`.
2.  In MetaMask, click your account icon -> **Import Account**.
3.  Paste the private keys to import them both.

### Authorize The Bank
By default, nobody is authorized as a "Bank" to approve KYC requests. You must manually add **Account A** as a bank.

1.  Copy **Account A**'s wallet address from MetaMask (e.g., `0xf39Fd...`).
2.  Run the following command in the **root** of the project (`KYC-web3`), replacing the dummy address with Account A's address:

```bash
BANK_ADDRESS=0xPasteAccountAAddressHere npx hardhat run scripts/addBank.js --network localhost
```

---

## 🎬 Phase 3: The Demonstration Workflow!

Now that everything is running and your roles are set up, you can demonstrate the full workflow.

### Step 1: The Customer Uploads KYC Data
1. Switch MetaMask to **Account B** (The Customer).
2. On the web app, click **Connect Wallet** (if not already connected).
3. Look at the "Customer Portal"; the Status should say **Not Registered**.
4. Under *KYC Document Hash*, type in a mock IPFS Hash (e.g., `QmPassportFile12345`).
5. Click **Submit KYC Data** and confirm the transaction in MetaMask.
6. **Result:** The UI updates instantly! It will now say **Status: Pending Verification**.

### Step 2: The Bank Verifies the Customer
1. Copy **Account B**'s address (The Customer's address) to your clipboard.
2. Switch your MetaMask wallet to **Account A** (The Bank).
3. Notice how the **Institution Portal** now proudly displays a yellow **"AUTHORIZED BANK"** badge! *(This proves the Role-Based Access Control is working).*
4. Under *Customer Address to Verify*, paste **Account B**'s address.
5. Click **Approve KYC** and confirm the transaction in MetaMask.

### Step 3: The Customer Checks Their Verified Status
1. Switch MetaMask back to **Account B** (The Customer).
2. **Result:** The Customer Portal now flashes a green **VERIFIED** badge, and permanently displays the wallet address of the bank that verified them!
