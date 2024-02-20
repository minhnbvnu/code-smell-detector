function Input(props) {
    var _this;
    Input_classCallCheck(this, Input);
    _this = _super.call(this, props);
    _this.saveClearableInput = function (input) {
      _this.clearableInput = input;
    };
    _this.saveInput = function (input) {
      _this.input = input;
    };
    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.focus();
      });
      resolveOnChange(_this.input, e, _this.props.onChange);
    };
    _this.renderInput = function (prefixCls) {
      var _this$props = _this.props,
        className = _this$props.className,
        addonBefore = _this$props.addonBefore,
        addonAfter = _this$props.addonAfter,
        size = _this$props.size,
        disabled = _this$props.disabled; // Fix https://fb.me/react-unknown-prop

      var otherProps = _omit_js_1_0_2_omit_js_es(_this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear',
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue', 'size', 'inputType']);
      return /*#__PURE__*/external_window_React_["createElement"]("input", Input_extends({}, otherProps, {
        onChange: _this.handleChange,
        onKeyDown: _this.handleKeyDown,
        className: _classnames_2_2_6_classnames_default()(getInputClassName(prefixCls, size, disabled), Input_defineProperty({}, className, className && !addonBefore && !addonAfter)),
        ref: _this.saveInput
      }));
    };
    _this.clearPasswordValueAttribute = function () {
      // https://github.com/ant-design/ant-design/issues/20541
      _this.removePasswordTimeout = setTimeout(function () {
        if (_this.input && _this.input.getAttribute('type') === 'password' && _this.input.hasAttribute('value')) {
          _this.input.removeAttribute('value');
        }
      });
    };
    _this.handleChange = function (e) {
      _this.setValue(e.target.value, _this.clearPasswordValueAttribute);
      resolveOnChange(_this.input, e, _this.props.onChange);
    };
    _this.handleKeyDown = function (e) {
      var _this$props2 = _this.props,
        onPressEnter = _this$props2.onPressEnter,
        onKeyDown = _this$props2.onKeyDown;
      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };
    _this.renderComponent = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var value = _this.state.value;
      var customizePrefixCls = _this.props.prefixCls;
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      return /*#__PURE__*/external_window_React_["createElement"](input_ClearableLabeledInput, Input_extends({}, _this.props, {
        prefixCls: prefixCls,
        inputType: "input",
        value: fixControlledValue(value),
        element: _this.renderInput(prefixCls),
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