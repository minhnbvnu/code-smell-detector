function EditorCore(props) {
	        _classCallCheck(this, EditorCore);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.cancelForceUpdateImmediate = function () {
	            clearImmediate(_this.forceUpdateImmediate);
	            _this.forceUpdateImmediate = null;
	        };
	        _this.handlePastedText = function (text, html) {
	            var editorState = _this.state.editorState;

	            if (html) {
	                var contentState = editorState.getCurrentContent();
	                var selection = editorState.getSelection();
	                var fragment = (0, _customHTML2Content2["default"])(html, contentState);
	                var pastedContent = _draftJs.Modifier.replaceWithFragment(contentState, selection, fragment);
	                var newContent = pastedContent.merge({
	                    selectionBefore: selection,
	                    selectionAfter: pastedContent.getSelectionAfter().set('hasFocus', true)
	                });
	                _this.setEditorState(_draftJs.EditorState.push(editorState, newContent, 'insert-fragment'), true);
	                return 'handled';
	            }
	            return 'not-handled';
	        };
	        _this.plugins = (0, _immutable.List)((0, _immutable.List)(props.plugins).flatten(true));
	        var editorState = void 0;
	        if (props.value !== undefined) {
	            if (props.value instanceof _draftJs.EditorState) {
	                editorState = props.value || _draftJs.EditorState.createEmpty();
	            } else {
	                editorState = _draftJs.EditorState.createEmpty();
	            }
	        } else {
	            editorState = _draftJs.EditorState.createEmpty();
	        }
	        editorState = _this.generatorDefaultValue(editorState);
	        _this.state = {
	            plugins: _this.reloadPlugins(),
	            editorState: editorState,
	            customStyleMap: {},
	            customBlockStyleMap: {},
	            compositeDecorator: null
	        };
	        if (props.value !== undefined) {
	            _this.controlledMode = true;
	            console.warn('this component is in controllred mode');
	        }
	        return _this;
	    }