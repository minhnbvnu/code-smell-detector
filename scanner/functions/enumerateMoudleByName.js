function enumerateMoudleByName(type) {
    var modulename = zTree.getSelectedNodes()[0].modulename;
    socket.emit("enumerateMoudleByName", {"modulename": modulename,"type": type});
    // if ("enumerateExports" == type){
    //
    // } else if ("enumerateRegisterNatives" == type){
    //
    // } else if ("enumerateImports" == type){
    //
    // } else if ("enumerateSymbols" == type){
    //
    // }
}