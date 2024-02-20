function TextArea(props) {
    var _this;
    TextArea_classCallCheck(this, TextArea);
    _this = _super.call(this, props);
    _this.saveTextArea = function (resizableTextArea) {
      _this.resizableTextArea = resizableTextArea;
    };
    _this.saveClearableInput = function (clearableInput) {
      _this.clearableInput = clearableInput;
    };
    _this.handleChange = function (e) {
      _this.setValue(e.target.value, function () {
        _this.resizableTextArea.resizeTextarea();
      });
      resolveOnChange(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };
    _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
        onPressEnter = _this$props.onPressEnter,
        onKeyDown = _this$props.onKeyDown;
      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };
    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.resizableTextArea.renderTextArea();
        _this.focus();
      });
      resolveOnChange(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };
    _this.renderTextArea = function (prefixCls) {
      return /*#__PURE__*/external_window_React_["createElement"](input_ResizableTextArea, TextArea_extends({}, _this.props, {
        prefixCls: prefixCls,
        onKeyDown: _this.handleKeyDown,
        onChange: _this.handleChange,
        ref: _this.saveTextArea
      }));
    };
    _this.renderComponent = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var value = _this.state.value;
      var customizePrefixCls = _this.props.prefixCls;
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      return /*#__PURE__*/external_window_React_["createElement"](input_ClearableLabeledInput, TextArea_extends({}, _this.props, {
        prefixCls: prefixCls,
        inputType: "text",
        value: fixControlledValue(value),
        element: _this.renderTextArea(prefixCls),
        handleReset: _this.handleReset,
        ref: _this.saveClearableInput
      }));
    };
    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value
    };
    return _this;
  }