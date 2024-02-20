function SuggestionPortal() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, SuggestionPortal);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.matchDecorates = function (props) {
	      var callbacks = props.callbacks,
	          suggestionRegex = props.suggestionRegex,
	          decoratedText = props.decoratedText;

	      var matches = suggestionRegex.exec(decoratedText);
	      _this.trigger = matches[2];
	      _this.updatePortalPosition(_this.props);
	      callbacks.setEditorState(callbacks.getEditorState());
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }