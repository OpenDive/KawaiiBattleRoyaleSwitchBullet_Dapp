pragma solidity ^0.6.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Hold KAWAII Tokens
// In charge of managing game
contract KBRGame {
    address oracle;
    IERC20 busd;
    IERC20 link;
    IERC20 gameTokens;

    uint defaultStake;

    struct Player {
        address player;
        uint    amountStake;
    }

    mapping(address => bool) public changeClaimed;

    event NewUserStakedAccess(address playerAddress);
    event DefaultStakeUpdated(uint newAmount);

    constructor(
        address _oracle, 
        address _busd, 
        address _link,
        address _kawaii ) {

        oracle  = _oracle;
        busd    = IERC20(_busd);
        link    = IERC20(_link); 
        kawaii  = IERC20(_kawaii);

        defaultStake = 30 * 10**18; // 30 BUSD
    }

    /// Stake to get acess to the game
    /// @param x the new value to store
    /// @dev the minimum required is updated based on the phase of the game relase
    /// @dev 
    function stakeToPlay() payable {
        uint256 allowance = busd.allowance(msg.sender, oracle);
        require( allowance >= defaultStake, "Check the token allowance" );
        busd.transferFrom(_msgSender(), oracle);
        kawaii.mint(2000 * 10**18); // Mint KAWAII tokens for staking

        emit NewUserStakedAccess(msg.sender);
    }

    function updateDefaultStake(uint _defaultStake) public onlyOwner {
        defaultStake = _defaultStake;
        emit DefaultStakeUpdated(defaultStake);
    }
}