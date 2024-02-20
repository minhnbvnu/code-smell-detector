function Mention(props) {
	    _classCallCheck(this, Mention);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.onEditorChange = function (editorState) {
	      var selection = editorState.getSelection();
	      _this._decorator = editorState.getDecorator();
	      var content = editorState.getCurrentContent();

	      if (_this.props.onChange) {
	        _this.setState({
	          selection: selection
	        }, function () {
	          _this.props.onChange(content, (0, _exportContent2["default"])(content));
	        });
	      } else {
	        _this.setState({
	          editorState: editorState,
	          selection: selection
	        });
	      }
	    };

	    _this.onFocus = function (e) {
	      if (_this.props.onFocus) {
	        _this.props.onFocus(e);
	      }
	    };

	    _this.onBlur = function (e) {
	      if (_this.props.onBlur) {
	        _this.props.onBlur(e);
	      }
	    };

	    _this.reset = function () {
	      /*eslint-disable*/
	      _this._editor.Reset();
	      /*eslint-enable*/
	    };

	    _this.mention = (0, _createMention2["default"])({
	      prefix: _this.getPrefix(props),
	      tag: props.tag,
	      mode: props.mode,
	      mentionStyle: props.mentionStyle
	    });

	    _this.Suggestions = _this.mention.Suggestions;
	    _this.plugins = [_this.mention];

	    _this.state = {
	      suggestions: props.suggestions,
	      value: props.value && _draftJs.EditorState.createWithContent(props.value, new _draftJs.CompositeDecorator(_this.mention.decorators)),
	      selection: _draftJs.SelectionState.createEmpty()
	    };

	    if (typeof props.defaultValue === 'string') {
	      // eslint-disable-next-line
	      console.warn('The property `defaultValue` now allow `EditorState` only, see http://react-component.github.io/editor-mention/examples/defaultValue.html ');
	    }
	    if (props.value !== undefined) {
	      _this.controlledMode = true;
	    }
	    return _this;
	  }