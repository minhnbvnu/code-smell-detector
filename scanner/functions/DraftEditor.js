function DraftEditor(props) {
	    _classCallCheck(this, DraftEditor);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.focus = function (scrollPosition) {
	      var editorState = _this.props.editorState;

	      var alreadyHasFocus = editorState.getSelection().getHasFocus();
	      var editorNode = ReactDOM.findDOMNode(_this.editor);

	      if (!editorNode) {
	        // once in a while people call 'focus' in a setTimeout, and the node has
	        // been deleted, so it can be null in that case.
	        return;
	      }

	      var scrollParent = Style.getScrollParent(editorNode);

	      var _ref = scrollPosition || getScrollPosition(scrollParent),
	          x = _ref.x,
	          y = _ref.y;

	      !(editorNode instanceof HTMLElement) ?  true ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
	      editorNode.focus();

	      // Restore scroll position
	      if (scrollParent === window) {
	        window.scrollTo(x, y);
	      } else {
	        Scroll.setTop(scrollParent, y);
	      }

	      // On Chrome and Safari, calling focus on contenteditable focuses the
	      // cursor at the first character. This is something you don't expect when
	      // you're clicking on an input element but not directly on a character.
	      // Put the cursor back where it was before the blur.
	      if (!alreadyHasFocus) {
	        _this.update(EditorState.forceSelection(editorState, editorState.getSelection()));
	      }
	    };

	    _this.blur = function () {
	      var editorNode = ReactDOM.findDOMNode(_this.editor);
	      !(editorNode instanceof HTMLElement) ?  true ? invariant(false, 'editorNode is not an HTMLElement') : invariant(false) : void 0;
	      editorNode.blur();
	    };

	    _this.setMode = function (mode) {
	      _this._handler = handlerMap[mode];
	    };

	    _this.exitCurrentMode = function () {
	      _this.setMode('edit');
	    };

	    _this.restoreEditorDOM = function (scrollPosition) {
	      _this.setState({ contentsKey: _this.state.contentsKey + 1 }, function () {
	        _this.focus(scrollPosition);
	      });
	    };

	    _this.setClipboard = function (clipboard) {
	      _this._clipboard = clipboard;
	    };

	    _this.getClipboard = function () {
	      return _this._clipboard;
	    };

	    _this.update = function (editorState) {
	      _this._latestEditorState = editorState;
	      _this.props.onChange(editorState);
	    };

	    _this.onDragEnter = function () {
	      _this._dragCount++;
	    };

	    _this.onDragLeave = function () {
	      _this._dragCount--;
	      if (_this._dragCount === 0) {
	        _this.exitCurrentMode();
	      }
	    };

	    _this._blockSelectEvents = false;
	    _this._clipboard = null;
	    _this._handler = null;
	    _this._dragCount = 0;
	    _this._editorKey = props.editorKey || generateRandomKey();
	    _this._placeholderAccessibilityID = 'placeholder-' + _this._editorKey;
	    _this._latestEditorState = props.editorState;
	    _this._latestCommittedEditorState = props.editorState;

	    _this._onBeforeInput = _this._buildHandler('onBeforeInput');
	    _this._onBlur = _this._buildHandler('onBlur');
	    _this._onCharacterData = _this._buildHandler('onCharacterData');
	    _this._onCompositionEnd = _this._buildHandler('onCompositionEnd');
	    _this._onCompositionStart = _this._buildHandler('onCompositionStart');
	    _this._onCopy = _this._buildHandler('onCopy');
	    _this._onCut = _this._buildHandler('onCut');
	    _this._onDragEnd = _this._buildHandler('onDragEnd');
	    _this._onDragOver = _this._buildHandler('onDragOver');
	    _this._onDragStart = _this._buildHandler('onDragStart');
	    _this._onDrop = _this._buildHandler('onDrop');
	    _this._onInput = _this._buildHandler('onInput');
	    _this._onFocus = _this._buildHandler('onFocus');
	    _this._onKeyDown = _this._buildHandler('onKeyDown');
	    _this._onKeyPress = _this._buildHandler('onKeyPress');
	    _this._onKeyUp = _this._buildHandler('onKeyUp');
	    _this._onMouseDown = _this._buildHandler('onMouseDown');
	    _this._onMouseUp = _this._buildHandler('onMouseUp');
	    _this._onPaste = _this._buildHandler('onPaste');
	    _this._onSelect = _this._buildHandler('onSelect');

	    _this.getEditorKey = function () {
	      return _this._editorKey;
	    };

	    // See `restoreEditorDOM()`.
	    _this.state = { contentsKey: 0 };
	    return _this;
	  }