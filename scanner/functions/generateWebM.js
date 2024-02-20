function generateWebM(images, fps) {
	var firstImage = images[0];
	if (!(/^data:image\/webp;base64,/ig).test(firstImage)) {
		throw "Invalid input";
	}
	firstImage = parseWebP(parseRIFF(atob(firstImage.slice(23))));
	
	var frameLength = 1000 / fps, numImages = images.length;
	
	var EBML = {
		"EBML": [{
			"EBMLVersion": 1,
			"EBMLReadVersion": 1,
			"EBMLMaxIDLength": 4,
			"EBMLMaxSizeLength": 8,
			"DocType": "webm",
			"DocTypeVersion": 2,
			"DocTypeReadVersion": 2
		}],
		"Segment": [{
			"Info": [{
				"TimecodeScale": 1e6, //do things in milliseconds (number of nanosecs for duration scale)
				"MuxingApp": "whammy",
				"WritingApp": "whammy",
				"Duration": Math.round(frameLength * numImages) //milliseconds total
			}],
			"Tracks": [{
				"TrackEntry": [{
					"TrackNumber": 1,
					"TrackUID": 1,
					"FlagLacing": 0,
					"Language": "und",
					"CodecID": "V_VP8",
					"CodecName": "VP8",
					"TrackType": 1,
					// "DefaultDuration": Math.round(1e6 * frameLength), //nanosecs per frame
					"Video": {
						"PixelWidth": firstImage.width,
						"PixelHeight": firstImage.height,
						//"DisplayWidth": firstImage.width,
						//"DisplayHeight": firstImage.height,
						//"DisplayUnit": 3
					}
				}]
			}],
			"Cluster": [{
				"Timecode": 0,
				"SimpleBlock": []
			}]
		}]
	};
	
	images.forEach(function(image, i) {
		var webp = parseWebP(parseRIFF(atob(image.slice(23))))
		EBML.Segment[0].Cluster[0].SimpleBlock.push(makeSimpleBlock({
			discardable: 0,
			frame: webp.data.substr(4),
			invisible: 0,
			keyframe: 1,
			lacing: 0,
			timecode: Math.round(i * frameLength),
			trackNum: 1
		}));
	});
	
	var video = generateEBML(EBML);
	return 'data:video/webm;base64,' + btoa(video);
}