function Cascader(props) {
	    _classCallCheck(this, Cascader);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	    _this.setPopupVisible = function (popupVisible) {
	      if (!('popupVisible' in _this.props)) {
	        _this.setState({ popupVisible: popupVisible });
	      }
	      // sync activeValue with value when panel open
	      if (popupVisible && !_this.state.visible) {
	        _this.setState({
	          activeValue: _this.state.value
	        });
	      }
	      _this.props.onPopupVisibleChange(popupVisible);
	    };

	    _this.handleChange = function (options, setProps, e) {
	      if (e.type !== 'keydown' || e.keyCode === _KeyCode2["default"].ENTER) {
	        _this.props.onChange(options.map(function (o) {
	          return o.value;
	        }), options);
	        _this.setPopupVisible(setProps.visible);
	      }
	    };

	    _this.handlePopupVisibleChange = function (popupVisible) {
	      _this.setPopupVisible(popupVisible);
	    };

	    _this.handleMenuSelect = function (targetOption, menuIndex, e) {
	      if (e && e.preventDefault) {
	        e.preventDefault();
	      }
	      // Keep focused state for keyboard support
	      var triggerNode = _this.refs.trigger.getRootDomNode();
	      if (triggerNode && triggerNode.focus) {
	        triggerNode.focus();
	      }
	      var _this$props = _this.props,
	          changeOnSelect = _this$props.changeOnSelect,
	          loadData = _this$props.loadData,
	          expandTrigger = _this$props.expandTrigger;

	      if (!targetOption || targetOption.disabled) {
	        return;
	      }
	      var activeValue = _this.state.activeValue;

	      activeValue = activeValue.slice(0, menuIndex + 1);
	      activeValue[menuIndex] = targetOption.value;
	      var activeOptions = _this.getActiveOptions(activeValue);
	      if (targetOption.isLeaf === false && !targetOption.children && loadData) {
	        if (changeOnSelect) {
	          _this.handleChange(activeOptions, { visible: true }, e);
	        }
	        _this.setState({ activeValue: activeValue });
	        loadData(activeOptions);
	        return;
	      }
	      var newState = {};
	      if (!targetOption.children || !targetOption.children.length) {
	        _this.handleChange(activeOptions, { visible: false }, e);
	        // set value to activeValue when select leaf option
	        newState.value = activeValue;
	        // add e.type judgement to prevent `onChange` being triggered by mouseEnter
	      } else if (changeOnSelect && (e.type === 'click' || e.type === 'keydown')) {
	        if (expandTrigger === 'hover') {
	          _this.handleChange(activeOptions, { visible: false }, e);
	        } else {
	          _this.handleChange(activeOptions, { visible: true }, e);
	        }
	        // set value to activeValue on every select
	        newState.value = activeValue;
	      }
	      newState.activeValue = activeValue;
	      //  not change the value by keyboard
	      if ('value' in _this.props || e.type === 'keydown' && e.keyCode !== _KeyCode2["default"].ENTER) {
	        delete newState.value;
	      }
	      _this.setState(newState);
	    };

	    _this.handleKeyDown = function (e) {
	      var children = _this.props.children;
	      // https://github.com/ant-design/ant-design/issues/6717
	      // Don't bind keyboard support when children specify the onKeyDown

	      if (children && children.props.onKeyDown) {
	        children.props.onKeyDown(e);
	        return;
	      }
	      var activeValue = [].concat(_toConsumableArray(_this.state.activeValue));
	      var currentLevel = activeValue.length - 1 < 0 ? 0 : activeValue.length - 1;
	      var currentOptions = _this.getCurrentLevelOptions();
	      var currentIndex = currentOptions.map(function (o) {
	        return o.value;
	      }).indexOf(activeValue[currentLevel]);
	      if (e.keyCode !== _KeyCode2["default"].DOWN && e.keyCode !== _KeyCode2["default"].UP && e.keyCode !== _KeyCode2["default"].LEFT && e.keyCode !== _KeyCode2["default"].RIGHT && e.keyCode !== _KeyCode2["default"].ENTER && e.keyCode !== _KeyCode2["default"].BACKSPACE && e.keyCode !== _KeyCode2["default"].ESC) {
	        return;
	      }
	      // Press any keys above to reopen menu
	      if (!_this.state.popupVisible && e.keyCode !== _KeyCode2["default"].BACKSPACE && e.keyCode !== _KeyCode2["default"].ESC) {
	        _this.setPopupVisible(true);
	        return;
	      }
	      if (e.keyCode === _KeyCode2["default"].DOWN || e.keyCode === _KeyCode2["default"].UP) {
	        var nextIndex = currentIndex;
	        if (nextIndex !== -1) {
	          if (e.keyCode === _KeyCode2["default"].DOWN) {
	            nextIndex += 1;
	            nextIndex = nextIndex >= currentOptions.length ? 0 : nextIndex;
	          } else {
	            nextIndex -= 1;
	            nextIndex = nextIndex < 0 ? currentOptions.length - 1 : nextIndex;
	          }
	        } else {
	          nextIndex = 0;
	        }
	        activeValue[currentLevel] = currentOptions[nextIndex].value;
	      } else if (e.keyCode === _KeyCode2["default"].LEFT || e.keyCode === _KeyCode2["default"].BACKSPACE) {
	        activeValue.splice(activeValue.length - 1, 1);
	      } else if (e.keyCode === _KeyCode2["default"].RIGHT) {
	        if (currentOptions[currentIndex] && currentOptions[currentIndex].children) {
	          activeValue.push(currentOptions[currentIndex].children[0].value);
	        }
	      } else if (e.keyCode === _KeyCode2["default"].ESC) {
	        _this.setPopupVisible(false);
	        return;
	      }
	      if (!activeValue || activeValue.length === 0) {
	        _this.setPopupVisible(false);
	      }
	      var activeOptions = _this.getActiveOptions(activeValue);
	      var targetOption = activeOptions[activeOptions.length - 1];
	      _this.handleMenuSelect(targetOption, activeOptions.length - 1, e);

	      if (_this.props.onKeyDown) {
	        _this.props.onKeyDown(e);
	      }
	    };

	    var initialValue = [];
	    if ('value' in props) {
	      initialValue = props.value || [];
	    } else if ('defaultValue' in props) {
	      initialValue = props.defaultValue || [];
	    }

	    _this.state = {
	      popupVisible: props.popupVisible,
	      activeValue: initialValue,
	      value: initialValue
	    };
	    return _this;
	  }