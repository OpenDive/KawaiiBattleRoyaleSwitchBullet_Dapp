pragma solidity ^0.6.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

// Hold KAWAII Tokens
// In charge of managing game
contract KBRGame is Ownable {
    address     public oracle;
    IERC20      public busd;
    IERC20      public link;
    ERC20PresetMinterPauser public kawaii;

    uint public defaultStake;
    uint public minStakeDays;

    struct Player {
        uint    timeJoined;
        uint    amountStaked;
    }

    mapping(address => Player) public players;

    event NewUserStakedAccess(address playerAddress);
    event UserWithdrewStake(address playerAddress);
    event DefaultStakeUpdated(uint newAmount);

    constructor(
        address _oracle, 
        address _busd, 
        address _link,
        address _kawaii ) public {

        oracle  = _oracle;
        busd    = IERC20(_busd);
        link    = IERC20(_link); 
        kawaii  = ERC20PresetMinterPauser(_kawaii);

        defaultStake = 30 * 10**18; // 30 BUSD
        minStakeDays = 30 days;
    }

    /// Stake to get acess to the game
    /// @dev the minimum required is updated based on the phase of the game relase
    function stakeToPlayBUSD() public payable {
        uint256 allowance = busd.allowance(msg.sender, oracle);
        require(allowance >= defaultStake, "Check the token allowance");
        busd.transferFrom(_msgSender(), oracle, defaultStake);

        Player memory player = Player({ timeJoined: now, amountStaked: allowance });
        players[msg.sender] = player;
        kawaii.mint(msg.sender, 2000 * 10**18); // Mint KAWAII tokens for staking
        emit NewUserStakedAccess(msg.sender);
    }

    /// Need to check equivalent amount of linke to defaultStake
    function stakeToPlayLINK() public payable {
        uint256 allowance = link.allowance(msg.sender, oracle);
        require(allowance >= defaultStake, "Check the token allowance");
        link.transferFrom(_msgSender(), oracle, defaultStake);

        Player memory player = Player({ timeJoined: now, amountStaked: allowance });
        players[msg.sender] = player;
        kawaii.mint(msg.sender, 2000 * 10**18); // Mint KAWAII tokens for staking
        emit NewUserStakedAccess(msg.sender);
    }

    ///
    /// @dev 
    function withdrawStake() public {
        Player memory player = players[msg.sender];
        require(player.timeJoined >= player.timeJoined + minStakeDays, "Cannot withdraw yet");
        busd.transfer(msg.sender, player.amountStaked);

        emit UserWithdrewStake(msg.sender);
    }

    function updateDefaultStake(uint _defaultStake) public onlyOwner {
        defaultStake = _defaultStake;
        emit DefaultStakeUpdated(defaultStake);
    }
}