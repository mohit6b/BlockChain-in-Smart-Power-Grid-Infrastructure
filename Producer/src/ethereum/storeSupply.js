import web3 from './web3';
import StoreSupply from './build/StoreSupply.json';

//0x903d1514a2f083472977360b2037cd8356933B09
export default () => {
  return new web3.eth.Contract(
    JSON.parse(StoreSupply.interface),'0x8B609C652641C0B570B0BF5009471Fc118C7DcE5'
  )
};
