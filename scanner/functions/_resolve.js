function _resolve(dangerous, resolved) {
	  if (resolved && resolved.indexOf(this) >= 0) return;

	  resolved = resolved || [];
	  resolved.push(this);

	  if (this.isVariableDeclarator()) {
	    if (this.get("id").isIdentifier()) {
	      return this.get("init").resolve(dangerous, resolved);
	    } else {}
	  } else if (this.isReferencedIdentifier()) {
	    var binding = this.scope.getBinding(this.node.name);
	    if (!binding) return;

	    if (!binding.constant) return;

	    if (binding.kind === "module") return;

	    if (binding.path !== this) {
	      var ret = binding.path.resolve(dangerous, resolved);

	      if (this.find(function (parent) {
	        return parent.node === ret.node;
	      })) return;
	      return ret;
	    }
	  } else if (this.isTypeCastExpression()) {
	    return this.get("expression").resolve(dangerous, resolved);
	  } else if (dangerous && this.isMemberExpression()) {

	    var targetKey = this.toComputedKey();
	    if (!t.isLiteral(targetKey)) return;

	    var targetName = targetKey.value;

	    var target = this.get("object").resolve(dangerous, resolved);

	    if (target.isObjectExpression()) {
	      var props = target.get("properties");
	      for (var _iterator3 = props, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
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

	        if (!prop.isProperty()) continue;

	        var key = prop.get("key");

	        var match = prop.isnt("computed") && key.isIdentifier({ name: targetName });

	        match = match || key.isLiteral({ value: targetName });

	        if (match) return prop.get("value").resolve(dangerous, resolved);
	      }
	    } else if (target.isArrayExpression() && !isNaN(+targetName)) {
	      var elems = target.get("elements");
	      var elem = elems[targetName];
	      if (elem) return elem.resolve(dangerous, resolved);
	    }
	  }
	}