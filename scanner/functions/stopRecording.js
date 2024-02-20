function stopRecording(callback) {
	        if (!mediaRecorder) {
	            return console.warn(WARNING);
	        }

	        /*jshint validthis:true */
	        var recordRTC = this;

	        if (!config.disableLogs) {
	            console.warn('Stopped recording ' + config.type + ' stream.');
	        }

	        if (config.type !== 'gif') {
	            mediaRecorder.stop(_callback);
	        } else {
	            mediaRecorder.stop();
	            _callback();
	        }

	        function _callback() {
	            for (var item in mediaRecorder) {
	                if (self) {
	                    self[item] = mediaRecorder[item];
	                }

	                if (recordRTC) {
	                    recordRTC[item] = mediaRecorder[item];
	                }
	            }

	            var blob = mediaRecorder.blob;
	            if (callback) {
	                var url = URL.createObjectURL(blob);
	                callback(url);
	            }

	            if (blob && !config.disableLogs) {
	                console.debug(blob.type, '->', bytesToSize(blob.size));
	            }

	            if (!config.autoWriteToDisk) {
	                return;
	            }

	            getDataURL(function(dataURL) {
	                var parameter = {};
	                parameter[config.type + 'Blob'] = dataURL;
	                DiskStorage.Store(parameter);
	            });
	        }
	    }