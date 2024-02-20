function clear_findMessage() {
    // $("#javatree").empty();
    $.fn.zTree.destroy("javatree");
    // console.log("clear_hookMessage");
    socket.emit("clear_hookMessage");
}