function updateVideo() {

    			scope.needsUpdate = true;
    			video.requestVideoFrameCallback( updateVideo );

    		}