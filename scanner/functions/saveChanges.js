function saveChanges(){
	if(decodeURIComponent(document.cookie).indexOf('hideWarningMessage=1')>=0 || location.protocol==='file:'){ /* chrome does not write cookies in local, so skip warning message in that case */
		SavegameEditor.save();
		tempFile.save();
	}else{
		MarcDialogs.open('warning');
	}
}