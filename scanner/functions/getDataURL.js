function getDataURL(blob, callback00) {
	            if (typeof Worker !== 'undefined') {
	                var webWorker = processInWebWorker(function readFile(_blob) {
	                    postMessage(new FileReaderSync().readAsDataURL(_blob));
	                });

	                webWorker.onmessage = function(event) {
	                    callback00(event.data);
	                };

	                webWorker.postMessage(blob);
	            } else {
	                var reader = new FileReader();
	                reader.readAsDataURL(blob);
	                reader.onload = function(event) {
	                    callback00(event.target.result);
	                };
	            }
	        }