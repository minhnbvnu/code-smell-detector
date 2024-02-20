function ECPrivate(params, buffer) {
	this._params = params;
	this._priv = new jsbn(utils.mpNormalize(buffer));
}