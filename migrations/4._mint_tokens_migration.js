const GameItems = artifacts.require("./KBRGameItems.sol");
const Marketplace = artifacts.require("./KBRMarketplace.sol");

module.exports = function (deployer, _network, accounts) {

  const KAWAII_CAPPED   = 0;   // 3 Billion Cap
  const SUPER_BOOTS     = 1; // Makes creature run faster
  const TIMEWARP_CAPE   = 2; // Slows down time
  const JETPACK         = 3; // A nifty jetpack
  const THORS_HAMMER    = 4;
  const SWORD           = 5;
  const SHIELD          = 6;
  const LOVE_GUN        = 7;

  const eighteen    = 100000000000000000
  const governance  = accounts[0];
  const address     = Marketplace.address;
  const ids         = [ SUPER_BOOTS, TIMEWARP_CAPE, JETPACK, THORS_HAMMER, SWORD, SHIELD, LOVE_GUN ];
  // const amounts     = [ String(2 * eighteen), String(1 * eighteen), String(1000 * eighteen), String(10 * eighteen), String(5 * eighteen), String(4 * eighteen), String(200 * eighteen)];
  const amounts     = ["2", "1", "1000", "10", "5", "4", "200"];
  const data        = "0x12";

  GameItems.deployed().then(instance => {
    instance.mintBatch(address, ids, amounts, data);
  });
};
