function clear_hookMessage() {
    $("#outputBody").empty();
    // console.log("clear_hookMessage");
    socket.emit("clear_hookMessage");
}