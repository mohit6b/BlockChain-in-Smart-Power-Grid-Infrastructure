/*import web3 from './web3';
import StoreHash from './build/Contract.json';

//0x903d1514a2f083472977360b2037cd8356933B09
export default () => {
  return new web3.eth.Contract(
    JSON.parse(StoreHash.interface),'0xbee2b24747df06c06b9f38babe3c92f0846538a2'
  )
};

*/
import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0xbee2b24747df06c06b9f38babe3c92f0846538a2';
//use the ABI from your contract
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getHash",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "sendHash",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export default new web3.eth.Contract(abi, address);
