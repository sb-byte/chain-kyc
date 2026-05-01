const fs = require("fs");
const path = require("path");

async function main() {
  const ChainKYC = await ethers.getContractFactory("ChainKYC");
  const chainKYC = await ChainKYC.deploy();
  await chainKYC.waitForDeployment();

  const address = await chainKYC.getAddress();
  console.log(`ChainKYC deployed to: ${address}`);

  // Save the ABI and address to the frontend
  const data = {
    address: address,
    abi: JSON.parse(chainKYC.interface.formatJson())
  };

  const frontendPath = path.join(__dirname, "../frontend/src/contracts");
  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath);
  }

  fs.writeFileSync(
    path.join(frontendPath, "ChainKYC.json"),
    JSON.stringify(data, null, 2)
  );
  console.log("Contract data saved to frontend/src/contracts/ChainKYC.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
