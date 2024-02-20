function ContentBlockNode() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRecord;

	    _classCallCheck(this, ContentBlockNode);

	    return _possibleConstructorReturn(this, _Record.call(this, decorateCharacterList(props)));
	  }