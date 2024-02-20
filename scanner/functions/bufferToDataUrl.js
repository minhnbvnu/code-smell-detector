function bufferToDataUrl(buffer, callback) {
	        var blob = new Blob(buffer, {
	            type: 'video/webm'
	        });

	        var reader = new FileReader();
	        reader.onload = function() {
	            callback(reader.result);
	        };
	        reader.readAsDataURL(blob);
	    }