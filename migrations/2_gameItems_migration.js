const GameItems = artifacts.require("./KBRGameItems.sol");

module.exports = function (deployer, _networkm, accounts) {
  const governance = accounts[0];
  deployer.deploy(GameItems, governance);
};
