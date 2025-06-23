const WebSocket = require('ws');
const socket = new WebSocket("wss://stream.aisstream.io/v0/stream")

socket.onopen = function (_) {
    let subscriptionMessage = {
        APIkey: "7ebb1fc481e3ed863627ae03a3ebb2b59bac9a94",
        BoundingBoxes: [[[-90, -180], [90, 180]]],
        FilterMessageTypes: ["PositionReport"]
    }
    socket.send(JSON.stringify(subscriptionMessage));
};

socket.onmessage = function (event) {
    let aisMessage = JSON.parse(event.data)
    const mmsi = aisMessage?.MetaData?.MMSI_String;
    console.log(mmsi)
    
    if (mmsi === 538006490) {
        console.log("Found target ship!", aisMessage);
        socket.close();
    }
};