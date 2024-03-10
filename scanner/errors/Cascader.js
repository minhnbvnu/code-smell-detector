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