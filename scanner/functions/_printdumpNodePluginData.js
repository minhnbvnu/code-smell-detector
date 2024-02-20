async function _printdumpNodePluginData(selection, root) {
	let _dumpPluginData = (pluginData, depth) => {
		if (!pluginData)
			return;
		let t = "";
		for (let i = 0; i < depth; ++i)
			t += "  ";
		for (let [k, v] of Object.entries(pluginData)) {
			trace(`${t}${k} => ${v}`);
		}
	};
	let _dumpNodePluginData = (xdNode, depth) => {
		if (!xdNode)
			return;
		let d = depth || 0;
		_dumpPluginData(xdNode.pluginData, d);
		xdNode.children.forEach((child) => {
			_dumpNodePluginData(child, d + 1);
		});
	};
	for (let i = 0; i < selection.items.length; ++i) {
		let item = selection.items[i];
		_dumpNodePluginData(item);
	}
}