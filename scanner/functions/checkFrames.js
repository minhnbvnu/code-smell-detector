function checkFrames(frames){
		var width = frames[0].width,
			height = frames[0].height,
			duration = frames[0].duration;
		for(var i = 1; i < frames.length; i++){
			if(frames[i].width != width) throw "Frame " + (i + 1) + " has a different width";
			if(frames[i].height != height) throw "Frame " + (i + 1) + " has a different height";
			if(frames[i].duration < 0 || frames[i].duration > 0x7fff) throw "Frame " + (i + 1) + " has a weird duration (must be between 0 and 32767)";
			duration += frames[i].duration;
		}
		return {
			duration: duration,
			width: width,
			height: height
		};
	}