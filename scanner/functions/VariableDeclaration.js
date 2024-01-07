function VariableDeclaration(node, parent) {
	  this.word(node.kind);
	  this.space();

	  var hasInits = false;

	  if (!t.isFor(parent)) {
	    for (var _iterator = node.declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var declar = _ref;

	      if (declar.init) {
	        hasInits = true;
	      }
	    }
	  }

	  var separator = void 0;
	  if (hasInits) {
	    separator = node.kind === "const" ? constDeclarationIdent : variableDeclarationIdent;
	  }

	  this.printList(node.declarations, node, { separator: separator });

	  if (t.isFor(parent)) {
	    if (parent.left === node || parent.init === node) return;
	  }

	  this.semicolon();
	}