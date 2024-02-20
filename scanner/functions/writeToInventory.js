function writeToInventory(container, table, offset){
	for(var i=0; i<table.length; i++){
		tempFile.writeU8(offset+table[i][0], getValue(container+table[i][0]))
	}
}