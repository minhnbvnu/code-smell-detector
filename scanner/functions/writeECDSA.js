function writeECDSA(key, options) {
	var out = '';
	out += 'Private-key-format: v1.3\n';

	if (key.curve === 'nistp256') {
		out += 'Algorithm: 13 (ECDSAP256SHA256)\n';
	} else if (key.curve === 'nistp384') {
		out += 'Algorithm: 14 (ECDSAP384SHA384)\n';
	} else {
		throw (new Error('Unsupported curve'));
	}
	var base64Key = key.part['d'].data.toString('base64');
	out += 'PrivateKey: ' + base64Key + '\n';

	// Assume that we're valid as-of now
	var timestamp = new Date();
	out += 'Created: ' + dnssecTimestamp(timestamp) + '\n';
	out += 'Publish: ' + dnssecTimestamp(timestamp) + '\n';
	out += 'Activate: ' + dnssecTimestamp(timestamp) + '\n';

	return (Buffer.from(out, 'ascii'));
}