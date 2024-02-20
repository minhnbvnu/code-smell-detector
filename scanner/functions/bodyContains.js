function bodyContains($obj) {
	var id = $obj.attr('id'),
		el = id ? env.window.document.getElementById(id) : null;
	// must also check that the element with the id is the one we want
	return el ? el === $obj[0] : $.contains(env.window.document.body, $obj[0]);
}