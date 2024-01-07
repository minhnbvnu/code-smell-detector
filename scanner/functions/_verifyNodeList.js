function _verifyNodeList(nodes) {
	  if (!nodes) {
	    return [];
	  }

	  if (nodes.constructor !== Array) {
	    nodes = [nodes];
	  }

	  for (var i = 0; i < nodes.length; i++) {
	    var node = nodes[i];
	    var msg = void 0;

	    if (!node) {
	      msg = "has falsy node";
	    } else if ((typeof node === "undefined" ? "undefined" : (0, _typeof3.default)(node)) !== "object") {
	      msg = "contains a non-object node";
	    } else if (!node.type) {
	      msg = "without a type";
	    } else if (node instanceof _index2.default) {
	      msg = "has a NodePath when it expected a raw object";
	    }

	    if (msg) {
	      var type = Array.isArray(node) ? "array" : typeof node === "undefined" ? "undefined" : (0, _typeof3.default)(node);
	      throw new Error("Node list " + msg + " with the index of " + i + " and type of " + type);
	    }
	  }

	  return nodes;
	}