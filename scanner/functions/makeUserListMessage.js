function makeUserListMessage() {
  var userListMsg = {
    type: "userlist",
    users: []
  };
  var i;

  // Add the users to the list

  for (i=0; i<connectionArray.length; i++) {
    userListMsg.users.push(connectionArray[i].username);
  }

  return userListMsg;
}