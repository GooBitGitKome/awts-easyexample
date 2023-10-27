import { ethers } from "hardhat";

describe("Myexample", function(){
    async function deployContract(){
        // Signerと呼ばれる，秘密鍵で通信している人の情報を取得
        const [owner, otherAccount] = await ethers.getSigners();    

        //deployed using the info based on hardhat.config.ts
        const preContract = await ethers.getContractFactory("Myexample");
        const contract = await preContract.deploy("AWTS","T");
        console.log("owner.address\t: \t", owner.address);
        console.log("contract.address: \t", contract.address);
        return{owner , contract};
    }
    it("デプロイテスト", async function(){
            await deployContract();
    });

    it("機能テスト: \n\tトークン発行，\n\tコントラクトの残高確認, \n\tトークンの送金テスト, \n\t自分の残高確認", async function () {
        const {owner, contract} = await deployContract();
        //トークンの発行およびテスト
        console.log("トークン発行テスト");
        await contract.myMint(1000000);
        const ammount = await contract.getAddBalance(contract.address);
        console.log("コントラクトの残高確認");
        console.log(ammount + " " +await contract.symbol());
        console.log("トークンの送金テスト");
        await contract.faucet()
        console.log("OK")
        console.log("自分の残高確認");
        console.log(Number(await contract.getMyBalance()) + await contract.symbol());
        await contract.faucet();
      });
});