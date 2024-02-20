function parseOneNum(data, type, format, opts) {
	if (format === 'ssh') {
		try {
			var buf = new SSHBuffer({buffer: data});
			var head = buf.readString();
		} catch (e) {
			/* fall through */
		}
		if (buf !== undefined) {
			var msg = 'SSH signature does not match expected ' +
			    'type (expected ' + type + ', got ' + head + ')';
			switch (head) {
			case 'ssh-rsa':
				assert.strictEqual(type, 'rsa', msg);
				opts.hashAlgo = 'sha1';
				break;
			case 'rsa-sha2-256':
				assert.strictEqual(type, 'rsa', msg);
				opts.hashAlgo = 'sha256';
				break;
			case 'rsa-sha2-512':
				assert.strictEqual(type, 'rsa', msg);
				opts.hashAlgo = 'sha512';
				break;
			case 'ssh-ed25519':
				assert.strictEqual(type, 'ed25519', msg);
				opts.hashAlgo = 'sha512';
				break;
			default:
				throw (new Error('Unknown SSH signature ' +
				    'type: ' + head));
			}
			var sig = buf.readPart();
			assert.ok(buf.atEnd(), 'extra trailing bytes');
			sig.name = 'sig';
			opts.parts.push(sig);
			return (new Signature(opts));
		}
	}
	opts.parts.push({name: 'sig', data: data});
	return (new Signature(opts));
}