function getFileContentByFileName(filename){
    $('#filepath').text(filename);
    $('#deletefilename').text(filename);
    socket.emit("getFileContentByFileName",{"filename": filename});
    // console.log(filename);
}