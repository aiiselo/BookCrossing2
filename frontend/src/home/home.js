import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
    } else {
      alert("Please enter name and room ID");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <h1>Join chatroom</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        placeholder="Room ID"
        value={roomname}
        onChange={(e) => setroomname(e.target.value)}
      ></input>
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  );
}

export default Homepage;