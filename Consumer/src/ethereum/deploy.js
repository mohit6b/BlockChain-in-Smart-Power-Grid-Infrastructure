const Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');
const compiledFactory = require('./build/Buyer.json');


const provider = new HDWalletProvider(
  'dress steel phrase album average giggle sad room exile web divert cause',
  'https://rinkeby.infura.io/I7P2ErGiQjuq4jNp41OE',
);
const web3 = new Web3(provider);

//const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1.com:8545"));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy contract from ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to ', result.options.address);
};

deploy();
