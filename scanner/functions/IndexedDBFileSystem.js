function IndexedDBFileSystem(cb, storeName, deprecateMsg) {
	        var this$1 = this;
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        AsyncKeyValueFileSystem$$1.call(this);
	        this.store = new IndexedDBStore(function (e) {
	            if (e) {
	                cb(e);
	            }
	            else {
	                this$1.init(this$1.store, function (e) {
	                    cb(e, this$1);
	                });
	            }
	        }, storeName);
	        deprecationMessage(deprecateMsg, IndexedDBFileSystem.Name, { storeName: storeName });
	    }