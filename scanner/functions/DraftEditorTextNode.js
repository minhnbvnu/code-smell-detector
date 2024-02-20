function DraftEditorTextNode(props) {
	    _classCallCheck(this, DraftEditorTextNode);

	    // By flipping this flag, we also keep flipping keys which forces
	    // React to remount this node every time it rerenders.
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this._forceFlag = false;
	    return _this;
	  }