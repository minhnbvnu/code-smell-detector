function buildMatchMemberExpression(match, allowPartial) {
	  var parts = match.split(".");

	  return function (member) {
	    if (!t.isMemberExpression(member)) return false;

	    var search = [member];
	    var i = 0;

	    while (search.length) {
	      var node = search.shift();

	      if (allowPartial && i === parts.length) {
	        return true;
	      }

	      if (t.isIdentifier(node)) {
	        if (parts[i] !== node.name) return false;
	      } else if (t.isStringLiteral(node)) {
	        if (parts[i] !== node.value) return false;
	      } else if (t.isMemberExpression(node)) {
	        if (node.computed && !t.isStringLiteral(node.property)) {
	          return false;
	        } else {
	          search.push(node.object);
	          search.push(node.property);
	          continue;
	        }
	      } else {
	        return false;
	      }

	      if (++i > parts.length) {
	        return false;
	      }
	    }

	    return true;
	  };
	}