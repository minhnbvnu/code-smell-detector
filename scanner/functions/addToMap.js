function addToMap(data, icon){
	var px=tempFile.readF32(SavegameEditor.Offsets.PLAYER_POSITION);
	var py=tempFile.readF32(SavegameEditor.Offsets.PLAYER_POSITION+8);
	var pz=tempFile.readF32(SavegameEditor.Offsets.PLAYER_POSITION+16);

	var points = [];
	for (var i = 0; i<data.length; i++){
		var l = BOTW_Data.COORDS[data[i]]
		if (l){
		   points.push({H:data[i], L:l})
		}
	}
	// fill closest first
	points.sort(function(a,b){
		aDist = dist(px,py,pz,a.L);
		bDist = dist(px,py,pz,b.L);
		return aDist - bDist
	})
	var count = 0;
	for (var i = 0; i<points.length && mapPinCount<MAX_MAP_PINS; i++){
		var pt = points[i]
		var hash = pt.H;
		var offset=SavegameEditor._searchHash(hash);
		if(offset && !tempFile.readU32(offset + 4)){
			addMapPin(icon, pt.L)
			count++;
			mapPinCount++;
		}
	}
	setValue('number-map-pins', mapPinCount);
	return count;
}