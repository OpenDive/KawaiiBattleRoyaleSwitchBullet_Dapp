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
    uint minStakeDays;

    struct Player {
        uint    timeJoined;
        uint    amountStake;
    }

    mapping(address => Players) public players;

    event NewUserStakedAccess(address playerAddress);
    event UserWithdrewStake(address playerAddress);
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
        minStakeDays = 30 days;
    }

    /// Stake to get acess to the game
    /// @param x the new value to store
    /// @dev the minimum required is updated based on the phase of the game relase
    /// @dev 
    function stakeToPlay() payable {
        uint256 allowance = busd.allowance(msg.sender, oracle);
        require(allowance >= defaultStake, "Check the token allowance");
        busd.transferFrom(_msgSender(), oracle, defaultStake);

        Player player = Player({
            timeJoined:     now,
            amountStaked:   allowance
        });
        players[msg.sender] = player;

        kawaii.mint(2000 * 10**18); // Mint KAWAII tokens for staking

        emit NewUserStakedAccess(msg.sender);
    }

    ///
    /// @param x t
    /// @dev 
    function withdrawStake() {
        Player memory player = player[msg.sender];
        require(player.timeJoined >= player.timeJoined + minStakeDays, "Cannot withdraw yet");
        busd.transfer(msg.sender, player.amountStake);

        emit UserWithdrewStake(msg.sender);
    }

    function updateDefaultStake(uint _defaultStake) public onlyOwner {
        defaultStake = _defaultStake;
        emit DefaultStakeUpdated(defaultStake);
    }
}