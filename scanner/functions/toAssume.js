function toAssume(uri, extns) {
	let i=0, x, len=uri.length - 1;
	if (uri.charCodeAt(len) === 47) {
		uri = uri.substring(0, len);
	}

	let arr=[], tmp=`${uri}/index`;
	for (; i < extns.length; i++) {
		x = extns[i] ? `.${extns[i]}` : '';
		if (uri) arr.push(uri + x);
		arr.push(tmp + x);
	}

	return arr;
}