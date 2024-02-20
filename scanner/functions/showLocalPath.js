function showLocalPath(id) {
    //单张编辑
    var img = editor.selection.getRange().getClosedNode();
    var images = editor.execCommand('wordimage');
    if(images.length==1 || img && img.tagName == 'IMG'){
        g(id).value = images[0];
        return;
    }
	var path = images[0];
    var leftSlashIndex  = path.lastIndexOf("/")||0,  //不同版本的doc和浏览器都可能影响到这个符号，故直接判断两种
        rightSlashIndex = path.lastIndexOf("\\")||0,
        separater = leftSlashIndex > rightSlashIndex ? "/":"\\" ;

	path = path.substring(0, path.lastIndexOf(separater)+1);
	g(id).value = path;
}