function checkIfHasFiles(e){
		if(e.dataTransfer.types)
			for(var i=0;i<e.dataTransfer.types.length;i++)
				if(e.dataTransfer.types[i]==='Files')
					return true;
		return false
	}