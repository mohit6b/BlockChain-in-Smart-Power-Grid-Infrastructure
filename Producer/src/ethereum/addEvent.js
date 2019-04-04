import web3 from './web3';
import GridEvent from './build/Gridevent.json';

//0x903d1514a2f083472977360b2037cd8356933B09
export default () => {
  return new web3.eth.Contract(
    JSON.parse(GridEvent.interface),'0x2679485Cf23158D3623C6562942C0abB10bd05a0'
  )
};
