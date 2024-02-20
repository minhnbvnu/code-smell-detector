function treeMap(tree, mapper) {
	    var childrenName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

	    return tree.map(function (node, index) {
	        var extra = {};
	        if (node[childrenName]) {
	            extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
	        }
	        return (0, _extends3['default'])({}, mapper(node, index), extra);
	    });
	}