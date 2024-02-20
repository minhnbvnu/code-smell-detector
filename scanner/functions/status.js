function status() {
	/*jshint validthis:true */
	return property(property(this, 'status'), 'code');
}