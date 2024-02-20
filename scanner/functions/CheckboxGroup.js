function CheckboxGroup(props) {
    var _this;
    Group_classCallCheck(this, CheckboxGroup);
    _this = _super.call(this, props);
    _this.cancelValue = function (value) {
      _this.setState(function (_ref) {
        var registeredValues = _ref.registeredValues;
        return {
          registeredValues: registeredValues.filter(function (val) {
            return val !== value;
          })
        };
      });
    };
    _this.registerValue = function (value) {
      _this.setState(function (_ref2) {
        var registeredValues = _ref2.registeredValues;
        return {
          registeredValues: [].concat(_toConsumableArray(registeredValues), [value])
        };
      });
    };
    _this.toggleOption = function (option) {
      var registeredValues = _this.state.registeredValues;
      var optionIndex = _this.state.value.indexOf(option.value);
      var value = _toConsumableArray(_this.state.value);
      if (optionIndex === -1) {
        value.push(option.value);
      } else {
        value.splice(optionIndex, 1);
      }
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }
      var onChange = _this.props.onChange;
      if (onChange) {
        var options = _this.getOptions();
        onChange(value.filter(function (val) {
          return registeredValues.indexOf(val) !== -1;
        }).sort(function (a, b) {
          var indexA = options.findIndex(function (opt) {
            return opt.value === a;
          });
          var indexB = options.findIndex(function (opt) {
            return opt.value === b;
          });
          return indexA - indexB;
        }));
      }
    };
    _this.renderGroup = function (_ref3) {
      var getPrefixCls = _ref3.getPrefixCls;
      var _assertThisInitialize = Group_assertThisInitialized(_this),
        props = _assertThisInitialize.props,
        state = _assertThisInitialize.state;
      var customizePrefixCls = props.prefixCls,
        className = props.className,
        style = props.style,
        options = props.options,
        restProps = Group_rest(props, ["prefixCls", "className", "style", "options"]);
      var prefixCls = getPrefixCls('checkbox', customizePrefixCls);
      var groupPrefixCls = "".concat(prefixCls, "-group");
      var domProps = _omit_js_1_0_2_omit_js_es(restProps, ['children', 'defaultValue', 'value', 'onChange', 'disabled']);
      var children = props.children;
      if (options && options.length > 0) {
        children = _this.getOptions().map(function (option) {
          return /*#__PURE__*/external_window_React_["createElement"](checkbox_Checkbox, {
            prefixCls: prefixCls,
            key: option.value.toString(),
            disabled: 'disabled' in option ? option.disabled : props.disabled,
            value: option.value,
            checked: state.value.indexOf(option.value) !== -1,
            onChange: option.onChange,
            className: "".concat(groupPrefixCls, "-item")
          }, option.label);
        });
      }
      var classString = _classnames_2_2_6_classnames_default()(groupPrefixCls, className);
      return /*#__PURE__*/external_window_React_["createElement"]("div", Group_extends({
        className: classString,
        style: style
      }, domProps), children);
    };
    _this.state = {
      value: props.value || props.defaultValue || [],
      registeredValues: []
    };
    return _this;
  }