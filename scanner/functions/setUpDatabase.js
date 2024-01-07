function setUpDatabase(openRequest) {
	  var db = openRequest.result;
	  db.createObjectStore(MODEL_STORE_NAME, {
	    keyPath: 'modelPath'
	  });
	  db.createObjectStore(INFO_STORE_NAME, {
	    keyPath: 'modelPath'
	  });
	}