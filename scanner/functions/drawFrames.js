function drawFrames(frameInterval) {
	        frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;

	        var duration = new Date().getTime() - lastTime;
	        if (!duration) {
	            return setTimeout(drawFrames, frameInterval, frameInterval);
	        }

	        if (isPausedRecording) {
	            lastTime = new Date().getTime();
	            return setTimeout(drawFrames, 100);
	        }

	        // via #206, by Jack i.e. @Seymourr
	        lastTime = new Date().getTime();

	        if (video.paused) {
	            // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
	            // Tweak for Android Chrome
	            video.play();
	        }

	        context.drawImage(video, 0, 0, canvas.width, canvas.height);
	        whammy.frames.push({
	            duration: duration,
	            image: canvas.toDataURL('image/webp')
	        });

	        if (!isStopDrawing) {
	            setTimeout(drawFrames, frameInterval, frameInterval);
	        }
	    }