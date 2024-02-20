function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
	            return [{
	                'data': clusterTimecode,
	                'id': 0xe7 // Timecode
	            }].concat(clusterFrames.map(function(webp) {
	                var block = makeSimpleBlock({
	                    discardable: 0,
	                    frame: webp.data.slice(4),
	                    invisible: 0,
	                    keyframe: 1,
	                    lacing: 0,
	                    trackNum: 1,
	                    timecode: Math.round(clusterCounter)
	                });
	                clusterCounter += webp.duration;
	                return {
	                    data: block,
	                    id: 0xa3
	                };
	            }));
	        }