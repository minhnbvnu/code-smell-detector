function downloadAsset() {
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
			appStart();
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
}