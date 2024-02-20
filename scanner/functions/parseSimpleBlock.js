function parseSimpleBlock(data){
	if (data.length < 4) {
		throw "Invalid Simple Block";
	}
	var buf = data.substr(0,4).split('').map(function(e){
		return e.charCodeAt(0)
	});
	if ((buf[0] & 0x80) != 0x80){
		throw "Invalid Simple Block: TrackNumber > 127 not supported";
	}
	var trackNum = buf[0] & 0x7f;
	var timecode = buf[1] << 8 | buf[2];
	var flags = buf[3] & 0xff;
	var keyframe = flags >> 7;
	var invisible = ((flags >> 3) & 0x1);
	var discardable = (flags  & 0x1);
	var lacing = (flags >> 1) & 0x3;
	//0 = no lacing, 1 = xiph lacing, 2 = fixed-size lacing, 3 = ebml lacing

	return {
		trackNum: trackNum,
		timecode: timecode,
		lacing: lacing,
		discardable: discardable,
		invisible: invisible,
		keyframe: keyframe,
		frame: data.substr(4)
	}
}