function uploadPics() {
	console.log("Ok, going to upload "+images.length+" images.");
	var defs = [];
	
	var fd = new FormData();
	
	images.forEach(function(i) {
		console.log('processing '+i);
		var def = $.Deferred();

		window.resolveLocalFileSystemURL(i, function(fileEntry) {
			console.log('got a file entry');
			fileEntry.file(function(file) {
				console.log('now i have a file ob');
				console.dir(file);
				var reader = new FileReader();
				reader.onloadend = function(e) {
					var imgBlob = new Blob([this.result], { type:file.type});
					fd.append('file'+(images.indexOf(i)+1), imgBlob);
					fd.append('fileName'+(images.indexOf(i)+1), file.name);
					def.resolve();
				};
				reader.readAsArrayBuffer(file);
				
			}, function(e) {
				console.log('error getting file', e);
			});			
		}, function(e) {
			console.log('Error resolving fs url', e);
		});

		defs.push(def.promise());
			
	});

	$.when.apply($, defs).then(function() {
		console.log("all things done");
		var request = new XMLHttpRequest();
		request.open('POST', 'http://192.168.5.13:3000/upload');
		request.send(fd);
	});
}