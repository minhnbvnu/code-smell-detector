function closeFile(){
	show('dragzone');
	hide('the-editor');
	hide('toolbar');
	if(typeof SavegameEditor.unload==='function')
		SavegameEditor.unload();
}