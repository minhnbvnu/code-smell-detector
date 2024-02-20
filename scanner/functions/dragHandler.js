function dragHandler(event){
	var csInterface = new CSInterface();
	var extPath 	= csInterface.getSystemPath(SystemPath.EXTENSION);
	var OSVersion	= csInterface.getOSInformation();
	
	if (extPath != null){
		extPath = extPath + '/payloads/test.jpg';
		if (OSVersion.indexOf("Windows") >=0){
			var sep = '\\\\';
			extPath = extPath.replace(/\//g, sep);
		}
		event.dataTransfer.setData("com.adobe.cep.dnd.file.0", extPath);
	//	event.dataTransfer.setData("com.adobe.cep.dnd.file.N", path);  N = (items to import - 1)
	}
}