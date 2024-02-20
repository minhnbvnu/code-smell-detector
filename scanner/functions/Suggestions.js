function Suggestions() {
	    _classCallCheck(this, Suggestions);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

	    _this.onEditorStateChange = function (editorState) {
	      var offset = _this.props.store.getOffset();
	      if (offset.size === 0) {
	        return editorState;
	      }
	      var selection = editorState.getSelection();
	      // 修复: 焦点移出再移入时, dropdown 会闪动一下
	      // 原因: https://github.com/facebook/draft-js/blob/67c5e69499e3b0c149ce83b004872afdf4180463/src/component/handlers/edit/editOnFocus.js#L33
	      // 此处强制 update 了一下,因此 onEditorStateChange 会 call 两次
	      if (!_this.props.callbacks.getEditorState().getSelection().getHasFocus() && selection.getHasFocus()) {
	        return editorState;
	      }

	      var _getSearchWord = (0, _getSearchWord3["default"])(editorState, selection),
	          word = _getSearchWord.word;

	      if (!word) {
	        _this.closeDropDown();
	        return editorState;
	      }
	      var selectionInsideMention = offset.map(function (_ref) {
	        var offsetKey = _ref.offsetKey;

	        var _decode = (0, _DraftOffsetKey.decode)(offsetKey),
	            blockKey = _decode.blockKey,
	            decoratorKey = _decode.decoratorKey,
	            leafKey = _decode.leafKey;

	        if (blockKey !== selection.anchorKey) {
	          return false;
	        }
	        var leaf = editorState.getBlockTree(blockKey).getIn([decoratorKey, 'leaves', leafKey]);
	        if (!leaf) {
	          return false;
	        }
	        var startKey = leaf.get('start');
	        var endKey = leaf.get('end');
	        // 处理只有一个 `@` 符号时的情况
	        if (!word) {
	          return false;
	        }
	        if (startKey === endKey - 1) {
	          return selection.anchorOffset >= startKey + 1 && selection.anchorOffset <= endKey ? offsetKey : false;
	        }
	        return selection.anchorOffset > startKey + 1 && selection.anchorOffset <= endKey ? offsetKey : false;
	      });

	      var selectionInText = selectionInsideMention.some(isNotFalse);
	      _this.activeOffsetKey = selectionInsideMention.find(isNotFalse);
	      var trigger = _this.props.store.getTrigger(_this.activeOffsetKey);

	      if (!selectionInText || !selection.getHasFocus()) {
	        _this.closeDropDown();
	        return editorState;
	      }

	      var searchValue = word.substring(trigger.length, word.length);
	      if (_this.lastSearchValue !== searchValue || _this.lastTrigger !== trigger) {
	        _this.lastSearchValue = searchValue;
	        _this.lastTrigger = trigger;
	        _this.props.onSearchChange(searchValue, trigger);
	      }
	      if (!_this.state.active) {
	        _this.openDropDown();
	      }
	      return editorState;
	    };

	    _this.onUpArrow = function (ev) {
	      ev.preventDefault();
	      if (_this.props.suggestions.length > 0) {
	        var newIndex = _this.state.focusedIndex - 1;
	        _this.setState({
	          focusedIndex: Math.max(newIndex, 0)
	        });
	      }
	    };

	    _this.onBlur = function (ev) {
	      ev.preventDefault();
	      _this.closeDropDown();
	    };

	    _this.onDownArrow = function (ev) {
	      ev.preventDefault();
	      var newIndex = _this.state.focusedIndex + 1;
	      _this.setState({
	        focusedIndex: newIndex >= _this.props.suggestions.length ? 0 : newIndex
	      });
	    };

	    _this.getContainer = function () {
	      var popupContainer = document.createElement('div');
	      var mountNode = void 0;
	      if (_this.props.getSuggestionContainer) {
	        mountNode = _this.props.getSuggestionContainer();
	        popupContainer.style.position = 'relative';
	      } else {
	        mountNode = document.body;
	      }
	      mountNode.appendChild(popupContainer);
	      return popupContainer;
	    };

	    _this.handleKeyBinding = function (command) {
	      return command === 'split-block';
	    };

	    _this.handleReturn = function (ev) {
	      ev.preventDefault();
	      var selectedSuggestion = _this.props.suggestions[_this.state.focusedIndex];
	      if (selectedSuggestion) {
	        if (_react2["default"].isValidElement(selectedSuggestion)) {
	          _this.onMentionSelect(selectedSuggestion.props.value, selectedSuggestion.props.data);
	        } else {
	          _this.onMentionSelect(selectedSuggestion);
	        }
	        _this.lastSearchValue = null;
	        _this.lastTrigger = null;
	        return true;
	      }
	      return false;
	    };

	    _this.renderReady = function () {
	      var container = _this.dropdownContainer;
	      if (!container) {
	        return;
	      }
	      var active = _this.state.active;
	      var activeOffsetKey = _this.activeOffsetKey;

	      var offset = _this.props.store.getOffset();
	      var dropDownPosition = offset.get(activeOffsetKey);
	      if (active && dropDownPosition) {
	        var dropDownStyle = _this.getPositionStyle(true, dropDownPosition.position());
	        Object.keys(dropDownStyle).forEach(function (key) {
	          container.style[key] = dropDownStyle[key];
	        });
	      }

	      if (!_this.focusItem) {
	        return;
	      }
	      (0, _domScrollIntoView2["default"])(_this.focusItem, container, {
	        onlyScrollIfNeeded: true
	      });
	    };

	    _this.getNavigations = function () {
	      var _this$props = _this.props,
	          prefixCls = _this$props.prefixCls,
	          suggestions = _this$props.suggestions;
	      var focusedIndex = _this.state.focusedIndex;

	      return suggestions.length ? _react2["default"].Children.map(suggestions, function (element, index) {
	        var focusItem = index === focusedIndex;
	        var ref = focusItem ? function (node) {
	          _this.focusItem = node;
	        } : null;
	        var mentionClass = (0, _classnames2["default"])(prefixCls + '-dropdown-item', {
	          focus: focusItem
	        });
	        if (_react2["default"].isValidElement(element)) {
	          return _react2["default"].cloneElement(element, {
	            className: mentionClass,
	            onMouseDown: function onMouseDown() {
	              return _this.onMentionSelect(element.props.value, element.props.data);
	            },
	            ref: ref
	          });
	        }
	        return _react2["default"].createElement(
	          _Nav2["default"],
	          {
	            ref: ref,
	            className: mentionClass,
	            onMouseDown: function onMouseDown() {
	              return _this.onMentionSelect(element);
	            }
	          },
	          element
	        );
	      }, _this) : _react2["default"].createElement(
	        'div',
	        { className: prefixCls + '-dropdown-notfound ' + prefixCls + '-dropdown-item' },
	        _this.props.notFoundContent
	      );
	    };

	    _this.state = {
	      isActive: false,
	      focusedIndex: 0,
	      container: false
	    };
	    return _this;
	  }