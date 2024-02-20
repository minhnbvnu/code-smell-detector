function secondsToTime(sec) {
	var min = Math.floor(sec / 60);
	sec = sec - (min * 60);
	if(sec < 10) {
		sec = "0" + sec;
	}
	return min + ":" + sec;
}