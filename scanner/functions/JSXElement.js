function JSXElement(node) {
	  var open = node.openingElement;
	  this.print(open, node);
	  if (open.selfClosing) return;

	  this.indent();
	  for (var _iterator = node.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var child = _ref;

	    this.print(child, node);
	  }
	  this.dedent();

	  this.print(node.closingElement, node);
	}