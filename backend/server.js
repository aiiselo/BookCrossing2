const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");

const users = [];

function new_User(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function get_User(id) {
  return users.find(user => user.id === id);
}

function user_Exit(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

module.exports = {
  new_User,
  get_User,
  user_Exit,
};

app.use(express());
app.use(cors());

var server = app.listen(8000);

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    const user = new_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(user.room);
    socket.emit("message", {
      userId: user.id,
      username: user.username,
      text: `Hi ${user.username}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      userId: user.id,
      username: user.username,
      text: `${user.username} is here!`,
    });
  });

  socket.on("chat", (text) => {
    const user = get_User(socket.id);
    io.to(user.room).emit("message", {
      userId: user.id,
      username: user.username,
      text: text,
    });
  });

  socket.on("disconnect", () => {
    const user = user_Exit(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        text: `${user.username} left chat`,
      });
    }
  });
});