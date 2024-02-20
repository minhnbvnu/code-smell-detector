function queryui() {
    var ptr = $("#txt_ui_ptr").val();
    socket.emit("queryui",{"ptr":ptr});
    $('#uiquery').modal('hide');
    // console.log(ptr)
}