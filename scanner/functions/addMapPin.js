function addMapPin(icon, location){
	// add pin to next availible location.
	iterateMapPins(function(val,offset){
		if (val == 0xffffffff){
			tempFile.writeU32(offset, icon)
			return false
		}
		return true;
	})
	var i = 0;
	var added = false;
	iterateMapPinLocations(function(val, offset){
		if (i%3 != 0){
			i++
			return true;
		}
		i++
		if (val == -100000){
			added = true;
			tempFile.writeF32(offset,location[0])
			tempFile.writeF32(offset+8,location[1])
			tempFile.writeF32(offset+16,location[2])
			return false;
		}
		return true;
	})
}