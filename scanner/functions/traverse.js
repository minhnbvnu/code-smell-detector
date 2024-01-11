function traverse(parent, opts, scope, state, parentPath) {
	  if (!parent) return;
	  if (!opts) opts = {};

	  if (!opts.noScope && !scope) {
	    if (parent.type !== "Program" && parent.type !== "File") {
	      throw new Error(messages.get("traverseNeedsParent", parent.type));
	    }
	  }

	  visitors.explode(opts);

	  traverse.node(parent, opts, scope, state, parentPath);
	}