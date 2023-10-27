// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.21;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

//Changed class name to AizuMujinToken
contract Myexample is ERC20 {
    mapping(address => mapping(address  => uint256)) private _allowances;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    address private _owner;
    //アクセスコントロール用の修飾子を自作
    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }
    // @title　コントラクターが呼び出された際に同時にミントも行わせる
    // @author Komeda
    // @dev 通常のコントラクターの処理に加え，Mint（トークン発行）も行う
    // @param name_ トークンの名前（例　日本円）
    // @param symbol_ トークンのシンボル（例　￥）
    constructor(string memory name_, string memory symbol_) ERC20(name_,symbol_) {
        _name = name_;
        _symbol = symbol_;
        _owner = msg.sender;
    }

    function myMint(uint256 ammount) external onlyOwner{
        _mint(msg.sender, ammount);
        _transfer(msg.sender, address(this), ammount);
    }
    // @title 1トークンを要求する
    // @author Komeda
    // @dev 1トークンをファンクションを呼び出したものに対して送金
    function faucet() public{
        require(getAddBalance(address(this)) > 0);//コントラクトに資金あるか
        _transfer(address(this), msg.sender, 1);
    }
    
    // @title アカウントのトークン数参照
    // @author Komeda
    // @dev アカウントのトークン数参照
    // @param account はアドレスとして使用
    // @return アカウントに紐づいた現在所有しているトークン数
    function getMyBalance() public view returns(uint256){
        return balanceOf(msg.sender);
    }
    function getAddBalance(address add) public view returns(uint256){
        return balanceOf(add);
    }  
    // @title　シンボルの取得
    // @author Komeda
    // @dev シンボルの取得
    // @return オブジェクト生成時に設定したトークンのシンボルを取得 
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}