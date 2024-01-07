function makePredicate(propertyName, knownTypes) {
	  function onlyChildren(node) {
	    t.assertNode(node);

	    // Assume no side effects until we find out otherwise.
	    var result = false;

	    function check(child) {
	      if (result) {
	        // Do nothing.
	      } else if (Array.isArray(child)) {
	        child.some(check);
	      } else if (t.isNode(child)) {
	        _assert2.default.strictEqual(result, false);
	        result = predicate(child);
	      }
	      return result;
	    }

	    var keys = t.VISITOR_KEYS[node.type];
	    if (keys) {
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var child = node[key];
	        check(child);
	      }
	    }

	    return result;
	  }

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

	  predicate.onlyChildren = onlyChildren;

	  return predicate;
	}