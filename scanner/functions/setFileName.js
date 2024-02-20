function setFileName(){
		var thisFilename = fileName;
		var p = fileName.lastIndexOf(".");
		var extention = "";
		if (p>=0) {
			thisFilename = fileName.substr(0,p);
			extention = fileName.substr(p);
		}
		var type = selectionType.getSelectedItem();
		if (type && type.extention) extention = type.extention;
		if (extention === ".mod" && Tracker.inFTMode()) extention = ".xm";
		fileNameInput.setValue(thisFilename + extention);
	}