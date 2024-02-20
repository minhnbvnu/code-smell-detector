function getFromStore(portionName) {
	                transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
	                    if (self.callback) {
	                        self.callback(event.target.result, portionName);
	                    }
	                };
	            }