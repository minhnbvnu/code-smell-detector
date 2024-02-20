function startSync() {
	
	var sync = ContentSync.sync({ src: imageZip, id: 'kittenZip' });
	
	sync.on('progress', function(data) {
		$imageDiv.html("<p>Syncing images: "+data.progress + "%</p>");
	});
	
	sync.on('complete', function(data) {
		//store localPath 
		localStorage.kittenLocalPath = data.localPath;
		displayImages();
	});
	
	sync.on('error', function(e) {
		console.log('Error: ', e.message);
	    // e.message
	});
	
	sync.on('cancel', function() {
	    // triggered if event is cancelled
	});	
}