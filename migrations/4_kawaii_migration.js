const Kawaii = artifacts.require("./KAWAIIToken.sol");

module.exports = function (deployer) {
  deployer.deploy(Kawaii);
};
