import web3 from './web3';
import Buyer from './build/Buyer.json';

//0x903d1514a2f083472977360b2037cd8356933B09
export default () => {
  return new web3.eth.Contract(
    JSON.parse(Buyer.interface),'0x69fb48Bf256c63629b75930448043212b408DC44'
  )
};
