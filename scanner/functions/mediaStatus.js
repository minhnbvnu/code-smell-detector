function mediaStatus(status) {
	if(isAndroid && status === Media.MEDIA_STOPPED) {
		media.seekTo(0);
		media.play();
	}
}