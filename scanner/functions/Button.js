function Button(props) {
    var _this;
    button_classCallCheck(this, Button);
    _this = _super.call(this, props);
    _this.saveButtonRef = function (node) {
      _this.buttonNode = node;
    };
    _this.handleClick = function (e) {
      var loading = _this.state.loading;
      var onClick = _this.props.onClick;
      if (loading) {
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };
    _this.renderButton = function (_ref) {
      var _classNames;
      var getPrefixCls = _ref.getPrefixCls,
        autoInsertSpaceInButton = _ref.autoInsertSpaceInButton;
      var _a = _this.props,
        customizePrefixCls = _a.prefixCls,
        type = _a.type,
        shape = _a.shape,
        size = _a.size,
        className = _a.className,
        children = _a.children,
        icon = _a.icon,
        ghost = _a.ghost,
        block = _a.block,
        rest = button_rest(_a, ["prefixCls", "type", "shape", "size", "className", "children", "icon", "ghost", "block"]);
      var _this$state = _this.state,
        loading = _this$state.loading,
        hasTwoCNChar = _this$state.hasTwoCNChar;
      var prefixCls = getPrefixCls('btn', customizePrefixCls);
      var autoInsertSpace = autoInsertSpaceInButton !== false; // large => lg
      // small => sm

      var sizeCls = '';
      switch (size) {
        case 'large':
          sizeCls = 'lg';
          break;
        case 'small':
          sizeCls = 'sm';
          break;
        default:
          break;
      }
      var iconType = loading ? 'loading' : icon;
      var classes = _classnames_2_2_6_classnames_default()(prefixCls, className, (_classNames = {}, button_defineProperty(_classNames, "".concat(prefixCls, "-").concat(type), type), button_defineProperty(_classNames, "".concat(prefixCls, "-").concat(shape), shape), button_defineProperty(_classNames, "".concat(prefixCls, "-").concat(sizeCls), sizeCls), button_defineProperty(_classNames, "".concat(prefixCls, "-icon-only"), !children && children !== 0 && iconType), button_defineProperty(_classNames, "".concat(prefixCls, "-loading"), !!loading), button_defineProperty(_classNames, "".concat(prefixCls, "-background-ghost"), ghost), button_defineProperty(_classNames, "".concat(prefixCls, "-two-chinese-chars"), hasTwoCNChar && autoInsertSpace), button_defineProperty(_classNames, "".concat(prefixCls, "-block"), block), _classNames));
      var iconNode = iconType ? /*#__PURE__*/external_window_React_["createElement"](es_icon, {
        type: iconType
      }) : null;
      var kids = children || children === 0 ? spaceChildren(children, _this.isNeedInserted() && autoInsertSpace) : null;
      var linkButtonRestProps = _omit_js_1_0_2_omit_js_es(rest, ['htmlType', 'loading']);
      if (linkButtonRestProps.href !== undefined) {
        return /*#__PURE__*/external_window_React_["createElement"]("a", button_extends({}, linkButtonRestProps, {
          className: classes,
          onClick: _this.handleClick,
          ref: _this.saveButtonRef
        }), iconNode, kids);
      } // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.

      var _b = rest,
        htmlType = _b.htmlType,
        otherProps = button_rest(_b, ["htmlType"]);
      var buttonNode = /*#__PURE__*/external_window_React_["createElement"]("button", button_extends({}, _omit_js_1_0_2_omit_js_es(otherProps, ['loading']), {
        type: htmlType,
        className: classes,
        onClick: _this.handleClick,
        ref: _this.saveButtonRef
      }), iconNode, kids);
      if (type === 'link') {
        return buttonNode;
      }
      return /*#__PURE__*/external_window_React_["createElement"](wave_Wave, null, buttonNode);
    };
    _this.state = {
      loading: props.loading,
      hasTwoCNChar: false
    };
    return _this;
  }