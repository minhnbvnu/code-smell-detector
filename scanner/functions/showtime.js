function showtime() {
		if (movie.currentTime === 0) {
			playButton.style.cursor = "default";
			movie.play();
			webcamVideo.play();
			ctrack.start(arCanvas);
			loopHandle = requestAnimationFrame(mainLoop);
		}	
	}