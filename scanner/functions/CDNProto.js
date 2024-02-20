function CDNProto(options) {
	if (options.hasOwnProperty("provider")) {
		client = pkgcloud.storage.createClient(options);
		this.opts = options;
	}
	else {
		console.warn("Credentials not found. Initializing in local fs mode...")
	}
}