function drawVideoFrame(time) {
	            if (isPausedRecording) {
	                return setTimeout(function() {
	                    drawVideoFrame(time);
	                }, 100);
	            }

	            lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

	            if (typeof lastFrameTime === undefined) {
	                lastFrameTime = time;
	            }

	            // ~10 fps
	            if (time - lastFrameTime < 90) {
	                return;
	            }

	            if (!isHTMLObject && video.paused) {
	                // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
	                // Tweak for Android Chrome
	                video.play();
	            }

	            context.drawImage(video, 0, 0, canvas.width, canvas.height);

	            if (config.onGifPreview) {
	                config.onGifPreview(canvas.toDataURL('image/png'));
	            }

	            gifEncoder.addFrame(context);
	            lastFrameTime = time;
	        }