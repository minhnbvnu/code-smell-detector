function Switch(props) {
    var _this;
    switch_classCallCheck(this, Switch);
    _this = _super.call(this, props);
    _this.saveSwitch = function (node) {
      _this.rcSwitch = node;
    };
    _this.renderSwitch = function (_ref) {
      var _classNames;
      var getPrefixCls = _ref.getPrefixCls;
      var _this$props = _this.props,
        customizePrefixCls = _this$props.prefixCls,
        size = _this$props.size,
        loading = _this$props.loading,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? '' : _this$props$className,
        disabled = _this$props.disabled;
      var prefixCls = getPrefixCls('switch', customizePrefixCls);
      var classes = _classnames_2_2_6_classnames_default()(className, (_classNames = {}, switch_defineProperty(_classNames, "".concat(prefixCls, "-small"), size === 'small'), switch_defineProperty(_classNames, "".concat(prefixCls, "-loading"), loading), _classNames));
      var loadingIcon = loading ? /*#__PURE__*/external_window_React_["createElement"](es_icon, {
        type: "loading",
        className: "".concat(prefixCls, "-loading-icon")
      }) : null;
      return /*#__PURE__*/external_window_React_["createElement"](wave_Wave, {
        insertExtraNode: true
      }, /*#__PURE__*/external_window_React_["createElement"](_rc_switch_1_9_2_rc_switch_es_default.a, switch_extends({}, _omit_js_1_0_2_omit_js_es(_this.props, ['loading']), {
        prefixCls: prefixCls,
        className: classes,
        disabled: disabled || loading,
        ref: _this.saveSwitch,
        loadingIcon: loadingIcon
      })));
    };
    _util_warning('checked' in props || !('value' in props), 'Switch', '`value` is not validate prop, do you mean `checked`?');
    return _this;
  }