function Popconfirm(props) {
    var _this;
    popconfirm_classCallCheck(this, Popconfirm);
    _this = _super.call(this, props);
    _this.onConfirm = function (e) {
      _this.setVisible(false, e);
      var onConfirm = _this.props.onConfirm;
      if (onConfirm) {
        onConfirm.call(popconfirm_assertThisInitialized(_this), e);
      }
    };
    _this.onCancel = function (e) {
      _this.setVisible(false, e);
      var onCancel = _this.props.onCancel;
      if (onCancel) {
        onCancel.call(popconfirm_assertThisInitialized(_this), e);
      }
    };
    _this.onVisibleChange = function (visible) {
      var disabled = _this.props.disabled;
      if (disabled) {
        return;
      }
      _this.setVisible(visible);
    };
    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    };
    _this.renderOverlay = function (prefixCls, popconfirmLocale) {
      var _this$props = _this.props,
        okButtonProps = _this$props.okButtonProps,
        cancelButtonProps = _this$props.cancelButtonProps,
        title = _this$props.title,
        cancelText = _this$props.cancelText,
        okText = _this$props.okText,
        okType = _this$props.okType,
        icon = _this$props.icon;
      return /*#__PURE__*/external_window_React_["createElement"]("div", null, /*#__PURE__*/external_window_React_["createElement"]("div", {
        className: "".concat(prefixCls, "-inner-content")
      }, /*#__PURE__*/external_window_React_["createElement"]("div", {
        className: "".concat(prefixCls, "-message")
      }, icon, /*#__PURE__*/external_window_React_["createElement"]("div", {
        className: "".concat(prefixCls, "-message-title")
      }, title)), /*#__PURE__*/external_window_React_["createElement"]("div", {
        className: "".concat(prefixCls, "-buttons")
      }, /*#__PURE__*/external_window_React_["createElement"](es_button, popconfirm_extends({
        onClick: _this.onCancel,
        size: "small"
      }, cancelButtonProps), cancelText || popconfirmLocale.cancelText), /*#__PURE__*/external_window_React_["createElement"](es_button, popconfirm_extends({
        onClick: _this.onConfirm,
        type: okType,
        size: "small"
      }, okButtonProps), okText || popconfirmLocale.okText))));
    };
    _this.renderConfirm = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _a = _this.props,
        customizePrefixCls = _a.prefixCls,
        placement = _a.placement,
        restProps = popconfirm_rest(_a, ["prefixCls", "placement"]);
      var prefixCls = getPrefixCls('popover', customizePrefixCls);
      var overlay = /*#__PURE__*/external_window_React_["createElement"](LocaleReceiver_LocaleReceiver, {
        componentName: "Popconfirm",
        defaultLocale: locale_default.Popconfirm
      }, function (popconfirmLocale) {
        return _this.renderOverlay(prefixCls, popconfirmLocale);
      });
      return /*#__PURE__*/external_window_React_["createElement"](tooltip, popconfirm_extends({}, restProps, {
        prefixCls: prefixCls,
        placement: placement,
        onVisibleChange: _this.onVisibleChange,
        visible: _this.state.visible,
        overlay: overlay,
        ref: _this.saveTooltip
      }));
    };
    _this.state = {
      visible: props.visible
    };
    return _this;
  }