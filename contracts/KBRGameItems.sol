pragma solidity ^0.6.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/presets/ERC1155PresetMinterPauser.sol";

//https://soliditydeveloper.com/erc-1155

contract KBRGameItems is ERC1155 {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private itemId;
    
    address public governance;
    
    // uint256 public itemId;
    uint256 public constant KAWAII_CAPPED   = 0;   // 3 Billion Cap
    uint256 public constant SUPER_BOOTS     = 1; // Makes creature run faster
    uint256 public constant TIMEWARP_CAPE   = 2; // Slows down time
    uint256 public constant JETPACK         = 3; // A nifty jetpack
    uint256 public constant THORS_HAMMER    = 4;
    uint256 public constant SWORD           = 5;
    uint256 public constant SHIELD          = 6;
    uint256 public constant LOVE_GUN        = 7;

    constructor(address _governance) public ERC1155("https://game.example/api/item/{id}.json") {
        governance = _governance;

        // KAWAII Tokens. 3 BILLION Marketcap
        _mint(address(this), KAWAII_CAPPED,    3 * (10**9), "KAWAII");

        // Initial NFT Items
        _mint(address(this), SUPER_BOOTS,      10**18,      "");
        _mint(address(this), TIMEWARP_CAPE,    1,           "");
        _mint(address(this), JETPACK,          10**27,      "");
        _mint(address(this), THORS_HAMMER,     1,           "");
        _mint(address(this), SWORD,            10**9,       "");
        _mint(address(this), SHIELD,           10**9,       "");
        _mint(address(this), LOVE_GUN,         10**10,      "");
        
        itemId.increment();
        itemId.increment();
        itemId.increment();
        itemId.increment();
        itemId.increment();
        itemId.increment();
    }

    function createItem(uint256 initialSupply) external onlyGovernance {
        itemId.increment();
        uint256 newItemId = itemId.current();
        _mint(address(this), newItemId, initialSupply, "");
    }

    function mintBatch(
        address to, 
        uint256[] memory ids, 
        uint256[] memory amounts, 
        bytes memory data) public onlyGovernance {

        _mintBatch(to, ids, amounts, data);
    }

    modifier onlyGovernance() {
        require(msg.sender == governance, "Only governance can call this");
        _;
    }
}