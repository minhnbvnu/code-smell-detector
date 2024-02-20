function clear_Custom_Message() {
    $("#CustomOutputBody").empty();
    socket.emit("clear_hookMessage");
}