pragma solidity ^0.4.17;


contract Buyer {

    struct Purchaser {
        string quantity;
        string deviceName;
        string purchaseDate;
        string orderID;
        string deviceID;
        string GridID;
    }

    Purchaser[] public orderList;
    mapping(string => bool) newPurchase;

    function requestSupply(string quantity, string deviceName, string purchaseDate,
        string orderID, string deviceID, string GridID) public {

        require(!newPurchase[orderID]);

        Purchaser memory order = Purchaser({
            quantity: quantity,
            deviceName: deviceName,
            purchaseDate: purchaseDate,
            orderID: orderID,
            deviceID: deviceID,
            GridID: GridID
            });
        newPurchase[orderID] = true;
        orderList.push(order);
    }

    function getOrderlistCount() public view returns(uint) {
        return orderList.length;
    }

}
