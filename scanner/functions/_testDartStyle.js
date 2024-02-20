async function _testDartStyle(selection, root) {
	let el = selection.items[0];
	if (!(el instanceof xd.Text)) { trace("select text"); return; }
	let str = el.text, count=0, maxT=1000, result;
	let t = Date.now();
	while (Date.now() - t < maxT) {
		result = formatDart(str);
		count++;
	}
	t = Date.now() - t;
	trace(result);
	trace("-------------------");
	trace(str.length + " characters formatted");
	trace(count + " iterations took " + t + "ms (avg: " + (t/count).toFixed(1) + "ms)");
}