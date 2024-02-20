function getNodeArray(val) {
		var retval = null;
		if (typeof(val) == 'string') {
			retval = document.querySelectorAll(val);
		} else if (global.NodeList && val instanceof global.NodeList) {
			retval = val;
		} else if (global.Node && val instanceof global.Node) {
			retval = [val];
		} else if (global.HTMLCollection && val instanceof global.HTMLCollection) {
			retval = val;
		} else if (val === null) {
			retval = [];
		}
		return retval;
	}