pragma solidity ^0.4.17;


contract StoreSupply {

    struct Supply {
        string amountStored;
        string capacity;
        string rate;
	string location;
	string startTime;
	string endTime;
        string GridID;
    }

    Supply[] public storedSupplyList;
    mapping(string => bool) ExistingGrids;

    function addStorage(string amountStored, string capacity, string rate,
        string location, string startTime, string endTime, string GridID) public {
        require(!ExistingGrids[GridID]);

        Supply memory newSupply = Supply({
            amountStored: amountStored,
            capacity:  capacity,
            rate:  rate,
	    location: location,
            startTime: startTime,
	    endTime:  endTime,
            GridID: GridID
            });
        ExistingGrids[GridID] = true;
        storedSupplyList.push(newSupply);
    }

    function getstoredSupplylistCount() public view returns(uint) {
        return storedSupplyList.length;
    }

}
