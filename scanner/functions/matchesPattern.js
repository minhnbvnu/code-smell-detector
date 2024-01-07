function matchesPattern(pattern, allowPartial) {
	  if (!this.isMemberExpression()) return false;

	  var parts = pattern.split(".");
	  var search = [this.node];
	  var i = 0;

	  function matches(name) {
	    var part = parts[i];
	    return part === "*" || name === part;
	  }

	  while (search.length) {
	    var node = search.shift();

	    if (allowPartial && i === parts.length) {
	      return true;
	    }

	    if (t.isIdentifier(node)) {
	      if (!matches(node.name)) return false;
	    } else if (t.isLiteral(node)) {
	      if (!matches(node.value)) return false;
	    } else if (t.isMemberExpression(node)) {
	      if (node.computed && !t.isLiteral(node.property)) {
	        return false;
	      } else {
	        search.unshift(node.property);
	        search.unshift(node.object);
	        continue;
	      }
	    } else if (t.isThisExpression(node)) {
	      if (!matches("this")) return false;
	    } else {
	      return false;
	    }

	    if (++i > parts.length) {
	      return false;
	    }
	  }

	  return i === parts.length;
	}