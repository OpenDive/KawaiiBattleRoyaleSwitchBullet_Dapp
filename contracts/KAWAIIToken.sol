pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract KAWAIIToken is ERC20PresetMinterPauser {
    // constructor(uint256 initialSupply) public ERC20("Kawaii", "KAWAII") {
    //     _mint(msg.sender, initialSupply);
    // }
    // bytes32 public constant MINTER_ROLE = keccak256("MY_ROLE");

    constructor(address _governance) public ERC20PresetMinterPauser("Kawaii", "KAWAII") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, _governance);
        _setupRole(PAUSER_ROLE, msg.sender);
        _mint(_governance, 3000000000);   // 3,000,000,000 - 3 Billion
    }
}