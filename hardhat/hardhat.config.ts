import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import * as dotenv from "dotenv";
// dotenv.config();
const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    // sepolia: {
    //   url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    //   accounts: [process.env.SEPOLIA_PRIVATE_KEY as string]
    // },
    goerli: {// just for compiling
      url: process.env.STAGING_QUICKNODE_KEY || "https://dummy.url.com",
      accounts: [process.env.PRIVATE_KEY || "0x1234567890123456789012345678901234567890123456789012345678901234"]
    }
  }
};

export default config;