function ElementNode(name, attributes, childNodes) {
	    _classCallCheck(this, ElementNode);

	    var _this2 = _possibleConstructorReturn(this, (ElementNode.__proto__ || Object.getPrototypeOf(ElementNode)).apply(this, arguments));

	    if (attributes == null) {
	      attributes = EMPTY_ATTR_LIST;
	    }
	    var isSelfClosing = SELF_CLOSING[name] === true;
	    _this2.nodeType = NODE_TYPE_ELEMENT;
	    _this2.nodeName = name;
	    _this2.attributes = attributes;
	    _this2.attrMap = new Map(attributes.map(function (attr) {
	      return [attr.name, attr];
	    }));
	    _this2.childNodes = [];
	    _this2.isSelfClosing = isSelfClosing;
	    if (!isSelfClosing && childNodes) {
	      childNodes.forEach(_this2.appendChild, _this2);
	    }
	    return _this2;
	  }