function Checkbox() {
    var _this;
    Checkbox_classCallCheck(this, Checkbox);
    _this = _super.apply(this, arguments);
    _this.saveCheckbox = function (node) {
      _this.rcCheckbox = node;
    };
    _this.renderCheckbox = function (_ref) {
      var _classNames;
      var getPrefixCls = _ref.getPrefixCls;
      var _assertThisInitialize = Checkbox_assertThisInitialized(_this),
        props = _assertThisInitialize.props,
        context = _assertThisInitialize.context;
      var customizePrefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        indeterminate = props.indeterminate,
        style = props.style,
        onMouseEnter = props.onMouseEnter,
        onMouseLeave = props.onMouseLeave,
        restProps = Checkbox_rest(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave"]);
      var checkboxGroup = context.checkboxGroup;
      var prefixCls = getPrefixCls('checkbox', customizePrefixCls);
      var checkboxProps = Checkbox_extends({}, restProps);
      if (checkboxGroup) {
        checkboxProps.onChange = function () {
          if (restProps.onChange) {
            restProps.onChange.apply(restProps, arguments);
          }
          checkboxGroup.toggleOption({
            label: children,
            value: props.value
          });
        };
        checkboxProps.name = checkboxGroup.name;
        checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
        checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
      }
      var classString = _classnames_2_2_6_classnames_default()(className, (_classNames = {}, Checkbox_defineProperty(_classNames, "".concat(prefixCls, "-wrapper"), true), Checkbox_defineProperty(_classNames, "".concat(prefixCls, "-wrapper-checked"), checkboxProps.checked), Checkbox_defineProperty(_classNames, "".concat(prefixCls, "-wrapper-disabled"), checkboxProps.disabled), _classNames));
      var checkboxClass = _classnames_2_2_6_classnames_default()(Checkbox_defineProperty({}, "".concat(prefixCls, "-indeterminate"), indeterminate));
      return /*#__PURE__*/(
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        external_window_React_["createElement"]("label", {
          className: classString,
          style: style,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }, /*#__PURE__*/external_window_React_["createElement"](es, Checkbox_extends({}, checkboxProps, {
          prefixCls: prefixCls,
          className: checkboxClass,
          ref: _this.saveCheckbox
        })), children !== undefined && /*#__PURE__*/external_window_React_["createElement"]("span", null, children))
      );
    };
    return _this;
  }