pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract KAWAIIToken is ERC20PresetMinterPauser {
    // constructor(uint256 initialSupply) public ERC20("Kawaii", "KAWAII") {
    //     _mint(msg.sender, initialSupply);
    // }

    constructor() public ERC20PresetMinterPauser("Kawaii", "KAWAII") {
        _mint(address(this), 3000000000);   // 3,000,000,000 - 3 Billion
    }
}