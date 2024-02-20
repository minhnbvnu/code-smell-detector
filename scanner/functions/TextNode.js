function TextNode(value) {
	    _classCallCheck(this, TextNode);

	    var _this = _possibleConstructorReturn(this, (TextNode.__proto__ || Object.getPrototypeOf(TextNode)).apply(this, arguments));

	    _this.nodeType = NODE_TYPE_TEXT;
	    _this.nodeName = '#text';
	    _this.nodeValue = value;
	    return _this;
	  }