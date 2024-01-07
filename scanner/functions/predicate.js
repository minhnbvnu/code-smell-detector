function predicate(node) {
	    t.assertNode(node);

	    var meta = m(node);
	    if (hasOwn.call(meta, propertyName)) return meta[propertyName];

	    // Certain types are "opaque," which means they have no side
	    // effects or leaps and we don't care about their subexpressions.
	    if (hasOwn.call(opaqueTypes, node.type)) return meta[propertyName] = false;

	    if (hasOwn.call(knownTypes, node.type)) return meta[propertyName] = true;

	    return meta[propertyName] = onlyChildren(node);
	  }