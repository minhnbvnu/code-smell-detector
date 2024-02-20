function putInDB() {
	            var transaction = db.transaction([self.dataStoreName], 'readwrite');

	            if (self.videoBlob) {
	                transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
	            }

	            if (self.gifBlob) {
	                transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
	            }

	            if (self.audioBlob) {
	                transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
	            }

	            function getFromStore(portionName) {
	                transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
	                    if (self.callback) {
	                        self.callback(event.target.result, portionName);
	                    }
	                };
	            }

	            getFromStore('audioBlob');
	            getFromStore('videoBlob');
	            getFromStore('gifBlob');
	        }