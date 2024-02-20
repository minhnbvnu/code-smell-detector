function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
	        var localCanvas = document.createElement('canvas');
	        localCanvas.width = canvas.width;
	        localCanvas.height = canvas.height;
	        var context2d = localCanvas.getContext('2d');
	        var resultFrames = [];

	        var checkUntilNotBlack = _framesToCheck === -1;
	        var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
	            _framesToCheck : _frames.length;
	        var sampleColor = {
	            r: 0,
	            g: 0,
	            b: 0
	        };
	        var maxColorDifference = Math.sqrt(
	            Math.pow(255, 2) +
	            Math.pow(255, 2) +
	            Math.pow(255, 2)
	        );
	        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
	        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
	        var doNotCheckNext = false;

	        asyncLoop({
	            length: endCheckFrame,
	            functionToLoop: function(loop, f) {
	                var matchPixCount, endPixCheck, maxPixCount;

	                var finishImage = function() {
	                    if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
	                        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
	                    } else {
	                        // console.log('frame is passed : ' + f);
	                        if (checkUntilNotBlack) {
	                            doNotCheckNext = true;
	                        }
	                        resultFrames.push(_frames[f]);
	                    }
	                    loop();
	                };

	                if (!doNotCheckNext) {
	                    var image = new Image();
	                    image.onload = function() {
	                        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
	                        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
	                        matchPixCount = 0;
	                        endPixCheck = imageData.data.length;
	                        maxPixCount = imageData.data.length / 4;

	                        for (var pix = 0; pix < endPixCheck; pix += 4) {
	                            var currentColor = {
	                                r: imageData.data[pix],
	                                g: imageData.data[pix + 1],
	                                b: imageData.data[pix + 2]
	                            };
	                            var colorDifference = Math.sqrt(
	                                Math.pow(currentColor.r - sampleColor.r, 2) +
	                                Math.pow(currentColor.g - sampleColor.g, 2) +
	                                Math.pow(currentColor.b - sampleColor.b, 2)
	                            );
	                            // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
	                            if (colorDifference <= maxColorDifference * pixTolerance) {
	                                matchPixCount++;
	                            }
	                        }
	                        finishImage();
	                    };
	                    image.src = _frames[f].image;
	                } else {
	                    finishImage();
	                }
	            },
	            callback: function() {
	                resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

	                if (resultFrames.length <= 0) {
	                    // at least one last frame should be available for next manipulation
	                    // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
	                    resultFrames.push(_frames[_frames.length - 1]);
	                }
	                callback(resultFrames);
	            }
	        });
	    }