pragma solidity ^0.6.0;

contract StakingPool {
    address payable public admin;
    uint public CurrTournamentId;
    uint public EntryPeriodEnd;
    bool public EntryPeriodFinalized;
    uint public totalStaked;
    uint public totalChange;

    mapping(address => uint) public balances;
    mapping(address => bool) public changeClaimed;

    event NewPlayerJoined(address playerAddress);

    constructor() public {
        admin = msg.sender;
        // endTournament = block.timestamp + 7 days;
        EntryPeriodEnd = now +7 days;
        CurrTournamentId = 0;
    }

    function stakeEntry() external payable {
        // require(block.timestamp <=  endTournament, 'Too late to enter');
        require(now <=  EntryPeriodEnd, 'Too late to enter');
        if(balances[msg.sender] == 0) {
            emit NewPlayerJoined(msg.sender);
        }

        // Handle gas fee
        uint fee = msg.value * 1 / 100;
        uint amountStaked = msg.value - fee;
        admin.transfer(fee);

        balances[msg.sender] += msg.value;
    }

    function finalize() external {
        require(now >= EntryPeriodEnd, 'Too early to finalize');
        require(EntryPeriodFinalized == false, 'Tournament has ended');
        EntryPeriodFinalized = true;
        totalStaked = address(this).balance;
        totalChange = address(this).balance % 32 ether;
    }

    function getChange() external payable {
        require(EntryPeriodFinalized == true, 'Entry period not finalized');
        require(balances[msg.sender] > 0, 'Not an investor');
        require(changeClaimed[msg.sender] == false, 'Change already claimed');

        changeClaimed[msg.sender] = true;
        uint amount = totalChange * balances[msg.sender] / totalStaked;
        msg.sender.transfer(amount);
    }
}