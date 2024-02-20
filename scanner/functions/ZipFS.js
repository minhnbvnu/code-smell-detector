function ZipFS(input, name, deprecateMsg) {
	        if ( name === void 0 ) name = '';
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        SynchronousFileSystem$$1.call(this);
	        this.name = name;
	        this._index = new FileIndex();
	        this._directoryEntries = [];
	        this._eocd = null;
	        deprecationMessage(deprecateMsg, ZipFS.Name, { zipData: "zip data as a Buffer", name: name });
	        if (input instanceof ZipTOC) {
	            this._index = input.index;
	            this._directoryEntries = input.directoryEntries;
	            this._eocd = input.eocd;
	            this.data = input.data;
	        }
	        else {
	            this.data = input;
	            this.populateIndex();
	        }
	    }