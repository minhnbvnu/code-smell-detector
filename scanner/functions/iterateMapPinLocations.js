function iterateMapPinLocations(f){
	offset = SavegameEditor.Offsets.MapApp_MapIconPos-4;
	for (var i = 0;; i++){
		var base = offset + (8 * i)
		var hdr = tempFile.readU32(base)
		var val = tempFile.readF32(base + 4)
		if (hdr != SavegameEditor.Headers.MapApp_MapIconPos){
			break
		}
		if(!f(val,base+4)){
			break
		}
	}
}