function getLogFile(){
		var f = new Date().toISOString().split('T')[0] + ".txt";
		if (f!==currentLogFile){
			if (stream){
				try {stream.end();}catch (e){}
			}
			stream = fs.createWriteStream(logDirectory + f, {flags:'a'});
		}
	}