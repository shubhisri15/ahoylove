import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

function GetShipData() {
  const [shipData, setShipData] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");
    socketRef.current.on("shipData", (data) => {
      setShipData(data);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Ship Data</h2>
      <pre>{shipData ? JSON.stringify(shipData, null, 2) : "Waiting for data..."}</pre>
    </div>
  );
}

export default GetShipData;
