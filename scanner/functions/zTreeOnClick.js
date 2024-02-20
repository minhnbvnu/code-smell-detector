function zTreeOnClick(event, treeId, treeNode) {
    var Nativeinfo = treeNode.NativeTag;
	var methodinfo = treeNode.methodinfo;
	var fullname = treeNode.fullname;
	if (methodinfo) {
        $("#findsmethodname").text(methodinfo);
		return ;
	}

	if (Nativeinfo && fullname != null){
	    $("#findsmethodname").text(fullname);
        return;
    } else if (Nativeinfo) {
        // $("#findsmethodname").text(Nativeinfo);
        var Nativesymbol = { Nativesymbol: Nativeinfo };
        socket.emit("Native2Sig", Nativesymbol);
		return ;
    }
    // alert(treeNode.name +','+ treeNode.methodname);
}