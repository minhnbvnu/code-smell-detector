function readChuck(){
		var chunk = {};
		chunk.name = file.readString(4);
		chunk.size = file.readDWord();
		return chunk;
	}