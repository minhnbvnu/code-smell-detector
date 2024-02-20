function onDeviceReady() {

	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
		console.log("got main dir",dir);
		dir.getFile("log.txt", {create:true}, function(file) {
			console.log("got the file", file);
			logOb = file;
			writeLog("App started");			
		});
	});
	
	document.querySelector("#actionOne").addEventListener("touchend", function(e) {
		//Ok, normal stuff for actionOne here
		//
		//Now log it
		writeLog("actionOne fired");
	}, false);

	document.querySelector("#actionTwo").addEventListener("touchend", function(e) {
		//Ok, normal stuff for actionTwo here
		//
		//Now log it
		writeLog("actionTwo fired");
	}, false);

}