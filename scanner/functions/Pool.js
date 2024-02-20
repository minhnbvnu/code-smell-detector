function Pool(options) {
	options = options || {};

	/**
	 * @property {Array} objects
	 * @type {Array}
	 */
	this.objects = [];

	if(options.size !== undefined){
		this.resize(options.size);
	}
}