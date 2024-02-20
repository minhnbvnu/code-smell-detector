function clearMapPins(){
	// types
	var count = 0;
	iterateMapPins(function(val,offset){
		if (val != 0xffffffff){
			count++;
			tempFile.writeU32(offset, 0xffffffff)
		}
		return true;
	})

	var count2 =0; 
	var i = 0;
	iterateMapPinLocations(function(val, offset){
		var expect = i % 3 == 0 ? -100000 : 0;
		i++;
		if (val != expect){
			count2++
			tempFile.writeF32(offset, expect)
		}
		return true
	})
	if (count2 / 3 > count){
		count = count2 / 3
	}
	mapPinCount = 0;
	setValue('number-map-pins', 0);
	MarcDialogs.alert(count+' map pins removed');
}