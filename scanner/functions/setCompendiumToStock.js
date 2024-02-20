function setCompendiumToStock(){
	var setToStock=0;
	for(var i=0; i<BOTW_Data.PICTURE_BOOK_SIZE.length; i++){
		var offset=SavegameEditor._searchHash(BOTW_Data.PICTURE_BOOK_SIZE[i]);
		if(typeof offset === 'number'){
			var val=tempFile.readU32(offset+4);
			if(val && val!==0xffffffff){
				tempFile.writeU32(offset+4, 0xffffffff);
				setToStock++;
			}
		}
	}
	MarcDialogs.alert(setToStock+' pics were reseted to stock.<br/>You can now safely remove all .jpg files under <u>pict_book</u> folder.');
}