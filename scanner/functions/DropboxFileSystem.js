function DropboxFileSystem(client, deprecateMsg) {
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        BaseFileSystem$$1.call(this);
	        this._client = new CachedDropboxClient(client);
	        deprecationMessage(deprecateMsg, DropboxFileSystem.Name, { client: "authenticated dropbox client instance" });
	        constructErrorCodeLookup();
	    }