const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

const { projectId, mnemonic } = require('../secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const provider = new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${projectId}`);

async function main() {
  const web3 = new Web3(provider);

  const loader = setupLoader({ provider: web3 }).web3;

  // Set up a web3 contract, representing a deployed ERC20, using the contract loader
  const address = '0xc00e94cb662c3520282e6f5717214004a7f26888';  // CMP address
  const token = loader.fromArtifact('ERC20', address);

  // Retrieve accounts
  const accounts = await web3.eth.getAccounts();
  
  // Call the deployed token contract
  const name = await token.methods.name().call();
  const symbol = await token.methods.symbol().call();
  const decimals = await token.methods.decimals().call();
  const totalSupply = await token.methods.totalSupply().call();
  console.log(`${name} (${symbol}) - Decimals:${decimals} Total Supply:${totalSupply}`);

  // At termination, `provider.engine.stop()' should be called to finish the process elegantly.
  provider.engine.stop();
}

main();