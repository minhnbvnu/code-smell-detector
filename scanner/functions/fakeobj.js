function fakeobj(addr) {
	var a = []
	for (var i = 0; i < 100; i++)
		a.push({});

	addr = addr.asDouble();
	return a.slice(0, {valueOf: function() { a.length = 0; a = [addr]; return 4; }})[3];
}