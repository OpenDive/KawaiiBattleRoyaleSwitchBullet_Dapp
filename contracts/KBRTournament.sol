pragma solidity ^0.6.0;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KBRTournament {
    address [] public newTournamentContracts;
    enum TOURNAMENT_STATE { 
        CREATED, 
        OPEN, 
        CLOSED, 
        LEGENDARY_AIRDROP, 
        CALCULATING_WINNER 
    }
    TOURNAMENT_STATE public tournamentState;
    
    mapping(uint256 => TournamentResult) TournamentResults;
    uint256 tournamentId;

    struct TournamentResult { 
        address winner;
        uint nftID;
        uint timeEnded;
    }
}