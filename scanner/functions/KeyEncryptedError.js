function KeyEncryptedError(name, format) {
	if (Error.captureStackTrace)
		Error.captureStackTrace(this, KeyEncryptedError);
	this.name = 'KeyEncryptedError';
	this.format = format;
	this.keyName = name;
	this.message = 'The ' + format + ' format key ' + name + ' is ' +
	    'encrypted (password-protected), and no passphrase was ' +
	    'provided in `options`';
}