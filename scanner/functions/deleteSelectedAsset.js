function deleteSelectedAsset() {
	var path = selectedItemInfoList[0].getElementsByTagName("filePath")[0].getAttribute("path");
	path = path.replace(/\\/g, "\\\\");
	evalScript('$._ext_PPRO.deleteAsset("' + path + '")');
}