const hre = require("hardhat");

async function main() {
  const bankAddress = process.env.BANK_ADDRESS;
  if (!bankAddress) {
    console.error("Please set BANK_ADDRESS environment variable.");
    process.exit(1);
  }

  // Address deployed in deploy.js
  const chainKYCAddress = require("../frontend/src/contracts/ChainKYC.json").address;
  const ChainKYC = await hre.ethers.getContractAt("ChainKYC", chainKYCAddress);

  const tx = await ChainKYC.addBank(bankAddress);
  await tx.wait();

  console.log(`Successfully added ${bankAddress} as an authorized bank.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
