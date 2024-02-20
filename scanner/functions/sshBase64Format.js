function sshBase64Format(alg, h) {
	return (alg.toUpperCase() + ':' + base64Strip(h));
}