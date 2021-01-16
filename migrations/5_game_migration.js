const Game = artifacts.require("./KBRGame.sol");
const Kawaii = artifacts.require("./KAWAIIToken.sol");

module.exports = function (deployer, _networkm, accounts) {
  const oracle            = accounts[0];
  const harmonyBUSDTest   = 'one1cjrqgc79n4v6ntavnl0rthlemgmrapp980fllp';
  const harmonyLINKTest   = 'one14j9a9vnagh2c9gug9celvfh5u0flf8yjyuwtzs';
  const KawaiiAddress     = Kawaii.address; 

  const harmonyBUSD       = 'one1u9mwheravgdesjnnqd4emfwcx3q3aae5hw36l2';
  const harmonyLINK       = 'one1yxzn9gf28zdy4yhup30my2gp68qerx929rv2ns';

  deployer.deploy(Game, 
    oracle, 
    harmonyBUSDTest, 
    harmonyLINKTest, 
    KawaiiAddress);
};