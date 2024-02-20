function createMention() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var callbacks = {
	    onChange: noop,
	    onUpArrow: noop,
	    onDownArrow: noop,
	    getEditorState: noop,
	    setEditorState: noop,
	    handleReturn: noop,
	    onBlur: noop
	  };
	  var componentProps = {
	    callbacks: callbacks,
	    mentionStore: _mentionStore2["default"]
	  };
	  var suggestionRegex = (0, _getRegExp2["default"])(config.prefix);

	  var tag = config.tag || _MentionContent2["default"];
	  var decorators = [{
	    strategy: function strategy(contentBlock, callback) {
	      findWithRegex(suggestionRegex, contentBlock, callback);
	    },
	    component: function component(props) {
	      return _react2["default"].createElement(_SuggestionPortal2["default"], _extends({}, props, componentProps, {
	        style: config.mentionStyle,
	        suggestionRegex: (0, _getRegExp2["default"])(config.prefix)
	      }));
	    }
	  }];
	  if (config.mode !== 'immutable') {
	    decorators.unshift({
	      strategy: mentionContentStrategy,
	      component: function component(props) {
	        return _react2["default"].createElement(MentionContentComponent, _extends({ tag: tag }, props, { callbacks: callbacks }));
	      }
	    });
	  }

	  return {
	    name: 'mention',
	    Suggestions: function Suggestions(props) {
	      return _react2["default"].createElement(_Suggestions3["default"], _extends({}, props, componentProps, {
	        store: _mentionStore2["default"]
	      }));
	    },
	    decorators: decorators,
	    onChange: function onChange(editorState) {
	      return callbacks.onChange ? callbacks.onChange(editorState) : editorState;
	    },
	    callbacks: callbacks,
	    "export": _exportContent2["default"]
	  };
	}