function setBooleans(hashTable, counterElement){
	var counter=0;
	for(var i=0;i<hashTable.length; i++){
		var offset=SavegameEditor._searchHash(hashTable[i]);
		if(offset && !tempFile.readU32(offset+4)){
			tempFile.writeU32(offset+4, 1);
			counter++;
		}
	}

	if(counterElement)
		setValue(counterElement, parseInt(getValue(counterElement))+counter);
	return counter;
}