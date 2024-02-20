function XmlHttpRequest(listingUrlOrObj, prefixUrl, deprecateMsg) {
	        if ( prefixUrl === void 0 ) prefixUrl = '';
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        BaseFileSystem$$1.call(this);
	        if (!listingUrlOrObj) {
	            listingUrlOrObj = 'index.json';
	        }
	        // prefix_url must end in a directory separator.
	        if (prefixUrl.length > 0 && prefixUrl.charAt(prefixUrl.length - 1) !== '/') {
	            prefixUrl = prefixUrl + '/';
	        }
	        this.prefixUrl = prefixUrl;
	        var listing = null;
	        if (typeof (listingUrlOrObj) === "string") {
	            listing = this._requestFileSync(listingUrlOrObj, 'json');
	            if (!listing) {
	                throw new Error("Unable to find listing at URL: ${listingUrlOrObj}");
	            }
	        }
	        else {
	            listing = listingUrlOrObj;
	        }
	        deprecationMessage(deprecateMsg, XmlHttpRequest.Name, { index: typeof (listingUrlOrObj) === "string" ? listingUrlOrObj : "file index as an object", baseUrl: prefixUrl });
	        this._index = FileIndex.fromListing(listing);
	    }