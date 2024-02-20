function clearInputNote(){
		// stops the oldest input note
		if (inputNotes.length){
			var note = inputNotes.shift();
			if (note.source){
				try{
					note.source.stop();
				}catch(e){

				}
			}
		}
	}