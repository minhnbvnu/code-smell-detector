function iterateMapPins(f){
	var offset = SavegameEditor.Offsets.MapApp_MapIconNo-4;
	for (var i = 0;; i++){
		var base = offset + (8 * i)
		var hdr = tempFile.readU32(base)
		var val = tempFile.readU32(base + 4)
		//if (hdr != SavegameEditor.Constants.MAP_ICONS){
		if (hdr != SavegameEditor.Headers.MapApp_MapIconNo){
			break
		}
		if (!f(val,base+4)){
			break
		}
	}
}