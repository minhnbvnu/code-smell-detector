function _tempFileLoadFunction(){
	if(SavegameEditor.checkValidSavegame()){
		hide('dragzone');

		if(SavegameEditor.preload && !hasBeenLoaded){
			SavegameEditor.preload();
			hasBeenLoaded=true;
		}
		SavegameEditor.load();
		show('the-editor');
		show('toolbar');
	}else{
		MarcDialogs.alert('Invalid savegame file');
	}
}