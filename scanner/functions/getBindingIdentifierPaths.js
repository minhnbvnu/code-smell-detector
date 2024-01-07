function getBindingIdentifierPaths() {
	  var duplicates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	  var outerOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var path = this;
	  var search = [].concat(path);
	  var ids = (0, _create2.default)(null);

	  while (search.length) {
	    var id = search.shift();
	    if (!id) continue;
	    if (!id.node) continue;

	    var keys = t.getBindingIdentifiers.keys[id.node.type];

	    if (id.isIdentifier()) {
	      if (duplicates) {
	        var _ids = ids[id.node.name] = ids[id.node.name] || [];
	        _ids.push(id);
	      } else {
	        ids[id.node.name] = id;
	      }
	      continue;
	    }

	    if (id.isExportDeclaration()) {
	      var declaration = id.get("declaration");
	      if (declaration.isDeclaration()) {
	        search.push(declaration);
	      }
	      continue;
	    }

	    if (outerOnly) {
	      if (id.isFunctionDeclaration()) {
	        search.push(id.get("id"));
	        continue;
	      }
	      if (id.isFunctionExpression()) {
	        continue;
	      }
	    }

	    if (keys) {
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var child = id.get(key);
	        if (Array.isArray(child) || child.node) {
	          search = search.concat(child);
	        }
	      }
	    }
	  }

	  return ids;
	}