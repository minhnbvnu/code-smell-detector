function HTML5FS(size, type, deprecateMsg) {
	        if ( size === void 0 ) size = 5;
	        if ( type === void 0 ) type = global$1.PERSISTENT;
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        BaseFileSystem$$1.call(this);
	        // Convert MB to bytes.
	        this.size = 1024 * 1024 * size;
	        this.type = type;
	        deprecationMessage(deprecateMsg, HTML5FS.Name, { size: size, type: type });
	    }