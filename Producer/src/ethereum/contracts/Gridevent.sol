pragma solidity ^0.4.17;

contract Gridevent {

    struct EventDetails {
        string eventstartTime;
        string eventendTime;
        string amountTransferred;
        string deviceName;
        string GridID;
        string eventID;
        string deviceID;
    }

    EventDetails[] public eventList;
    mapping(string => bool) eventIDs;

    function createEvent(string eventstartTime, string eventendTime,
        string amountTransferred, string deviceName, string GridID,
        string eventID, string deviceID) public {

        require(!eventIDs[eventID]);

        EventDetails memory transferEvent = EventDetails({
            eventstartTime: eventstartTime,
            eventendTime: eventendTime,
            amountTransferred: amountTransferred,
            deviceName: deviceName,
            GridID: GridID,
            eventID: eventID,
            deviceID: deviceID
            });
        eventIDs[eventID] = true;
        eventList.push(transferEvent);
    }

    function getEventCount() public view returns(uint) {
        return eventList.length;
    }

}
