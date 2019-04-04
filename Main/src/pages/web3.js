/*const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

let web3;

if (false && typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //In browser and has metamask
  web3 = new Web3(window.web3.currentProvider);
} else {

//const web3 = new Web3(new Web3.providers.HttpProvider("http://ripe7q-dns-reg1.southindia.cloudapp.azure.com:8545"));
  const provider = new HDWalletProvider(
    'dress steel phrase album average giggle sad room exile web divert cause',
    'https://rinkeby.infura.io/I7P2ErGiQjuq4jNp41OE',
  );
  web3 = new Web3(provider);
}

export default web3;*/


// //overrides metamask v0.2 for our 1.0 version.  
//1.0 lets us use async and await instead of promises

import Web3 from 'web3';
//overrides metamask v0.2 for our v 1.0
const web3 = new Web3(window.web3.currentProvider);

export default web3;
