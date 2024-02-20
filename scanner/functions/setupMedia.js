function setupMedia() {

	/*
	mp3 source: 
	http://www.gutenberg.org/ebooks/10246
	Sensation Jazz: One-Step by All-Star Trio
	*/
	var mp3 = './10246-m-001.mp3';
	var media;
	
	document.querySelector('#testMedia').addEventListener('click', function() {
		media = new Media(mp3, function() {
			console.log('[media] Success');
		}, function(err) {
			console.log('[media error]', err);	
		}, function(s) {
			/*
			Media.MEDIA_NONE = 0;
			Media.MEDIA_STARTING = 1;
			Media.MEDIA_RUNNING = 2;
			Media.MEDIA_PAUSED = 3;
			Media.MEDIA_STOPPED = 4;
			*/
			console.log('[media status]', s);		
		});
		
		setTimeout(function() {
			console.log('[media] Duration is '+media.getDuration());
		},100);

		media.play();

	});

	document.querySelector('#testMediaStop').addEventListener('click', function() {
		media.stop();
	});
}