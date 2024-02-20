function clear_stackMessage() {
    $("#stackoutputBody").empty();
    // console.log("clear_hookMessage");
    socket.emit("clear_hookMessage");
}