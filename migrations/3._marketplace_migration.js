const GameItems = artifacts.require("./KBRGameItems.sol");
const Marketplace = artifacts.require("./KBRMarketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, GameItems.address);
};
