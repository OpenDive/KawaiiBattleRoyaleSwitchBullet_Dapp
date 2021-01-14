const fs              = require('fs');
const path            = require('path');
const Web3            = require('web3');
const secrets         = JSON.parse( fs.readFileSync('.secrets.json').toString().trim() );
const eth_oracleKeys  = secrets.eth_oracleKeys;
const infuraId        = secrets.infuraId;

const { setupLoader }   = require('@openzeppelin/contract-loader');
const HDWalletProvider  = require('@truffle/hdwallet-provider');

const erc20ABI                = require('./build/contracts/ERC20.json');
const poolABI                 = require('./build/contracts/LendingPool.json');
const poolAddressProviderABI  = require('./build/contracts/LendingPoolAddressProvider.json');

const provider = new HDWalletProvider( eth_oracleKeys, `https://kovan.infura.io/v3/${infuraId}`,0, 1 );

async function main() {
  const web3 = new Web3(provider);

  const loader = setupLoader({ provider: web3 }).web3;
  // const loader = setupLoader({ provider: web3 }).truffle;

  // Set up a web3 contract, representing a deployed ERC20, using the contract loader
  const address = '0x61460874a7196d6a22d1ee4922473664b3e95270';  // CMP address
  // const token = loader.fromArtifact('ERC20', address); // for web-eth-contract
  const token = loader.fromABI(erc20ABI, null, address);


  const lpAddressProviderAddress = "0x88757f2f99175387aB4C6a4b3067c77A695b0349";
  const addressProvider = loader.fromABI(poolAddressProviderABI, null, lpAddressProviderAddress);
  const lpCoreAddress  = await addressProvider.methods.getLendingPool().call();
  console.log(`ADDRESS: ${lpCoreAddress}`);

  // Get latest lending pool address
  // const lendingPoolAddress = "0x9FE532197ad76c5a68961439604C037EB796"; 
  const lendingPool = loader.fromABI(poolABI, null, lpCoreAddress);
  const isPaused = await lendingPool.methods.paused().call();
  console.log(`PAUSED:  ${isPaused}`);

  const reservesList = await lendingPool.methods.getReservesList().call();
  console.log(`RESERVES:  ${reservesList}`);

  // Retrieve accounts
  const accounts = await web3.eth.getAccounts();
  
  // Call the deployed token contract
  // const name = await token.methods.name().call();
  // const symbol = await token.methods.symbol().call();
  // const decimals = await token.methods.decimals().call();
  // const totalSupply = await token.methods.totalSupply().call();
  // console.log(`${name} (${symbol}) - Decimals:${decimals} Total Supply:${totalSupply}`);


  // At termination, `provider.engine.stop()' should be called to finish the process elegantly.
  provider.engine.stop();
}

main();