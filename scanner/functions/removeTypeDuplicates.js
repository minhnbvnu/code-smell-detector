function removeTypeDuplicates(nodes) {
	  var generics = {};
	  var bases = {};

	  var typeGroups = [];

	  var types = [];

	  for (var i = 0; i < nodes.length; i++) {
	    var node = nodes[i];
	    if (!node) continue;

	    if (types.indexOf(node) >= 0) {
	      continue;
	    }

	    if (t.isAnyTypeAnnotation(node)) {
	      return [node];
	    }

	    if (t.isFlowBaseAnnotation(node)) {
	      bases[node.type] = node;
	      continue;
	    }

	    if (t.isUnionTypeAnnotation(node)) {
	      if (typeGroups.indexOf(node.types) < 0) {
	        nodes = nodes.concat(node.types);
	        typeGroups.push(node.types);
	      }
	      continue;
	    }

	    if (t.isGenericTypeAnnotation(node)) {
	      var name = node.id.name;

	      if (generics[name]) {
	        var existing = generics[name];
	        if (existing.typeParameters) {
	          if (node.typeParameters) {
	            existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params));
	          }
	        } else {
	          existing = node.typeParameters;
	        }
	      } else {
	        generics[name] = node;
	      }

	      continue;
	    }

	    types.push(node);
	  }

	  for (var type in bases) {
	    types.push(bases[type]);
	  }

	  for (var _name in generics) {
	    types.push(generics[_name]);
	  }

	  return types;
	}