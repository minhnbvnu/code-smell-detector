function Printer(format, map, tokens) {
	    (0, _classCallCheck3.default)(this, Printer);
	    this.inForStatementInitCounter = 0;
	    this._printStack = [];
	    this._indent = 0;
	    this._insideAux = false;
	    this._printedCommentStarts = {};
	    this._parenPushNewlineState = null;
	    this._printAuxAfterOnNextUserNode = false;
	    this._printedComments = new _weakSet2.default();
	    this._endsWithInteger = false;
	    this._endsWithWord = false;

	    this.format = format || {};
	    this._buf = new _buffer2.default(map);
	    this._whitespace = tokens.length > 0 ? new _whitespace2.default(tokens) : null;
	  }