function flatFilter(tree, callback) {
	    return tree.reduce(function (acc, node) {
	        if (callback(node)) {
	            acc.push(node);
	        }
	        if (node.children) {
	            var children = flatFilter(node.children, callback);
	            acc.push.apply(acc, (0, _toConsumableArray3['default'])(children));
	        }
	        return acc;
	    }, []);
	}