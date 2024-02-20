function getSavegameAllNames(){
	if(typeof SavegameEditor.Filename==='string')
		return SavegameEditor.Filename;
	else{
		var s='';
		for(var i=0; i<SavegameEditor.Filename.length; i++){
			if(i){
				if(i===(SavegameEditor.Filename.length-1))
					s+=' or ';
				else
					s+=', ';
			}
			s+=SavegameEditor.Filename[i];
		}
		return s
	}
}