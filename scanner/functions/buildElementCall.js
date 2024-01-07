function buildElementCall(path, file) {
	    path.parent.children = t.react.buildChildren(path.parent);

	    var tagExpr = convertJSXIdentifier(path.node.name, path.node);
	    var args = [];

	    var tagName = void 0;
	    if (t.isIdentifier(tagExpr)) {
	      tagName = tagExpr.name;
	    } else if (t.isLiteral(tagExpr)) {
	      tagName = tagExpr.value;
	    }

	    var state = {
	      tagExpr: tagExpr,
	      tagName: tagName,
	      args: args
	    };

	    if (opts.pre) {
	      opts.pre(state, file);
	    }

	    var attribs = path.node.attributes;
	    if (attribs.length) {
	      attribs = buildOpeningElementAttributes(attribs, file);
	    } else {
	      attribs = t.nullLiteral();
	    }

	    args.push(attribs);

	    if (opts.post) {
	      opts.post(state, file);
	    }

	    return state.call || t.callExpression(state.callee, args);
	  }