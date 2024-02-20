function clear_doburp_hookMessage() {
    $("#toburpoutputBody").empty();
    // console.log("clear_hookMessage");
    socket.emit("clear_hookMessage");
}