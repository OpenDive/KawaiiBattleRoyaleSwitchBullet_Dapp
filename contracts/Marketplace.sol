pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Holder.sol";

contract Marketplace is ERC1155Holder{
    IERC1155 private token;
    mapping (uint => uint) price;

    /**
     * ERC155 address
     */
    constructor(IERC1155 _token) public {
        require(address(_token) != address(0), 'Cannot be an empty address');
        
        token = _token;
        price[1] = 100000000000000; // 0.001 ETH
        price[2] = 200000000000000; //
        price[3] = 300000000000000;
    }

    /**
     * 1. Check if sent right amount
     * 2. Check token with a given id exists
     */
    function buyToken(uint _tokenId) public payable {
        uint256 weiAmount = msg.value;
        require(weiAmount >= price[_tokenId] && price[_tokenId] != 0);

        // safeTransferFrom(from, to, id, amount, data)
        // We are always transfering one
        _token.safeTransferFrom(
            address(this), 
            msg.sender, 
            _tokenId, 
            1, 
            ''
        );
        // emit TransferSingle(msg.sender, address(0x0), msg.sender, _id, _initialSupply);
    }

    /**
    * @dev Will pass to onERC115Batch5Received
    */
    function onERC1155Received(
        address _operator, 
        address _from, 
        uint256 _id, 
        uint256 _amount, 
        bytes memory _data) override public returns(bytes4)
    {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
    
    /**
     * onERC1155Received(address, address, uint256, uint256, bytes)
     */
    // function onERC1155Received(
    //     address _operator, 
    //     address _from, 
    //     uint256 _id, 
    //     uint256 _value, 
    //     bytes memory _data) external returns(bytes4) {

    //     return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    // }
}