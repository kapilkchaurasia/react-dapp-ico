//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

contract RandallCoin {
    mapping(address => uint256) public balances;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    mapping(uint => bool) blockMined;
    uint256 totalMinted = 0 ;
    uint256 conversionRateRANCToEth = 100;
    address payable treasury = payable(address(0x2109E7dEb259F9A61eafFBd30b60a85415Fa51eF));
    constructor() {
        address deployer = msg.sender;
        balances[deployer] = 100000000 * 1e10; // 1 million
        totalMinted += 100000000 * 1e10; // 1 million
    }
    
    function mintedTillNow()  public view returns (uint256) {
        return totalMinted;
    }
    
    function name() public pure returns (string memory){
        return "randallCoin";
    }

    function symbol() public pure returns (string memory) {
        return "RANC";
    }

    function decimals() public pure returns (uint8) {
        return 10; // 1 RANC = 1 * 1e10 unit
    }

    function totalSupply() public pure returns (uint256) {
        return 1000000000; //10 million
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        assert(balances[msg.sender] > _value);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function getCurrentBlock() public view returns(uint){
        return block.number;
    }

    function isMined(uint blockNumber) public view returns(bool) {
        return blockMined[blockNumber];
    }

//    function mine() public returns(bool success){
//        if(blockMined[block.number]){ // rewards of this block already mined
//            return false;
//        }
//        if(block.number % 10 != 0 ){ // not a 10th block
//            return false;
//        }
//        balances[msg.sender] = balances[msg.sender] + 10*1e10;
//        totalMinted = totalMinted + 10*1e10;
//        blockMined[block.number] = true;
//        return true;
//    }

    function mine() payable public returns(bool success){
        require(msg.value >= 1 *1e15, "minimum entry is .001 eth");
        treasury.transfer(msg.value);
        uint256 rANCAmount = (msg.value/1e8)*(conversionRateRANCToEth);
        balances[msg.sender] = balances[msg.sender] + rANCAmount;
        totalMinted = totalMinted + rANCAmount;
        return true;
    }
}
