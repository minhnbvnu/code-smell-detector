function readInventoryFromTable(container, table, offset){
	for(var i=0; i<table.length; i++){
		setValue(container+table[i][0], tempFile.readU8(offset+table[i][0]));
		checkQuantity(getField(container+table[i][0]));
	}
}