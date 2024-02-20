function PrivateKey(opts) {
	assert.object(opts, 'options');
	Key.call(this, opts);

	this._pubCache = undefined;
}