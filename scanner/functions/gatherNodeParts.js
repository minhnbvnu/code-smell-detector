function gatherNodeParts(node, parts) {
	  if (t.isModuleDeclaration(node)) {
	    if (node.source) {
	      gatherNodeParts(node.source, parts);
	    } else if (node.specifiers && node.specifiers.length) {
	      for (var _iterator2 = node.specifiers, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	        var _ref2;

	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }

	        var specifier = _ref2;

	        gatherNodeParts(specifier, parts);
	      }
	    } else if (node.declaration) {
	      gatherNodeParts(node.declaration, parts);
	    }
	  } else if (t.isModuleSpecifier(node)) {
	    gatherNodeParts(node.local, parts);
	  } else if (t.isMemberExpression(node)) {
	    gatherNodeParts(node.object, parts);
	    gatherNodeParts(node.property, parts);
	  } else if (t.isIdentifier(node)) {
	    parts.push(node.name);
	  } else if (t.isLiteral(node)) {
	    parts.push(node.value);
	  } else if (t.isCallExpression(node)) {
	    gatherNodeParts(node.callee, parts);
	  } else if (t.isObjectExpression(node) || t.isObjectPattern(node)) {
	    for (var _iterator3 = node.properties, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var prop = _ref3;

	      gatherNodeParts(prop.key || prop.argument, parts);
	    }
	  }
	}