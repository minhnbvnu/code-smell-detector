function drawCanvasFrame() {
	        if (isPausedRecording) {
	            lastTime = new Date().getTime();
	            return setTimeout(drawCanvasFrame, 500);
	        }

	        if (htmlElement.nodeName.toLowerCase() === 'canvas') {
	            var duration = new Date().getTime() - lastTime;
	            // via #206, by Jack i.e. @Seymourr
	            lastTime = new Date().getTime();

	            whammy.frames.push({
	                image: cloneCanvas(),
	                duration: duration
	            });

	            if (isRecording) {
	                setTimeout(drawCanvasFrame, config.frameInterval);
	            }
	            return;
	        }

	        html2canvas(htmlElement, {
	            grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
	            onrendered: function(canvas) {
	                var duration = new Date().getTime() - lastTime;
	                if (!duration) {
	                    return setTimeout(drawCanvasFrame, config.frameInterval);
	                }

	                // via #206, by Jack i.e. @Seymourr
	                lastTime = new Date().getTime();

	                whammy.frames.push({
	                    image: canvas.toDataURL('image/webp', 1),
	                    duration: duration
	                });

	                if (isRecording) {
	                    setTimeout(drawCanvasFrame, config.frameInterval);
	                }
	            }
	        });
	    }