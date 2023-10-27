import { ethers } from "hardhat";

async function main() {
  // Signerと呼ばれる，秘密鍵で通信している人の情報を取得
  const [owner, otherAccount] = await ethers.getSigners();    

  //deployed using the info based on hardhat.config.ts
  const preContract = await ethers.getContractFactory("Myexample");
  const contract = await preContract.deploy("AWTS","T");
  console.log("owner.address\t: \t", owner.address);
  console.log("contract.address: \t", contract.address);

  await contract.myMint(1000000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
