function getSavegameDefaultName(){
	if(typeof SavegameEditor.Filename==='string')
		return SavegameEditor.Filename;
	return SavegameEditor.Filename[0]
}