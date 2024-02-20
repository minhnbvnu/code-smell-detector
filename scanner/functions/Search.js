function Search() {
    var _this;
    Search_classCallCheck(this, Search);
    _this = _super.apply(this, arguments);
    _this.saveInput = function (node) {
      _this.input = node;
    };
    _this.onChange = function (e) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        onSearch = _this$props.onSearch;
      if (e && e.target && e.type === 'click' && onSearch) {
        onSearch(e.target.value, e);
      }
      if (onChange) {
        onChange(e);
      }
    };
    _this.onSearch = function (e) {
      var _this$props2 = _this.props,
        onSearch = _this$props2.onSearch,
        loading = _this$props2.loading,
        disabled = _this$props2.disabled;
      if (loading || disabled) {
        return;
      }
      if (onSearch) {
        onSearch(_this.input.input.value, e);
      }
      if (!Object(_is_mobile_2_2_2_is_mobile["isMobile"])({
        tablet: true
      })) {
        _this.input.focus();
      }
    };
    _this.renderLoading = function (prefixCls) {
      var _this$props3 = _this.props,
        enterButton = _this$props3.enterButton,
        size = _this$props3.size;
      if (enterButton) {
        return /*#__PURE__*/external_window_React_["createElement"](es_button, {
          className: "".concat(prefixCls, "-button"),
          type: "primary",
          size: size,
          key: "enterButton"
        }, /*#__PURE__*/external_window_React_["createElement"](es_icon, {
          type: "loading"
        }));
      }
      return /*#__PURE__*/external_window_React_["createElement"](es_icon, {
        className: "".concat(prefixCls, "-icon"),
        type: "loading",
        key: "loadingIcon"
      });
    };
    _this.renderSuffix = function (prefixCls) {
      var _this$props4 = _this.props,
        suffix = _this$props4.suffix,
        enterButton = _this$props4.enterButton,
        loading = _this$props4.loading;
      if (loading && !enterButton) {
        return [suffix, _this.renderLoading(prefixCls)];
      }
      if (enterButton) return suffix;
      var icon = /*#__PURE__*/external_window_React_["createElement"](es_icon, {
        className: "".concat(prefixCls, "-icon"),
        type: "search",
        key: "searchIcon",
        onClick: _this.onSearch
      });
      if (suffix) {
        return [/*#__PURE__*/ /*#__PURE__*/external_window_React_["isValidElement"](suffix) ? /*#__PURE__*/external_window_React_["cloneElement"](suffix, {
          key: 'suffix'
        }) : null, icon];
      }
      return icon;
    };
    _this.renderAddonAfter = function (prefixCls) {
      var _this$props5 = _this.props,
        enterButton = _this$props5.enterButton,
        size = _this$props5.size,
        disabled = _this$props5.disabled,
        addonAfter = _this$props5.addonAfter,
        loading = _this$props5.loading;
      var btnClassName = "".concat(prefixCls, "-button");
      if (loading && enterButton) {
        return [_this.renderLoading(prefixCls), addonAfter];
      }
      if (!enterButton) return addonAfter;
      var button;
      var enterButtonAsElement = enterButton;
      var isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
      if (isAntdButton || enterButtonAsElement.type === 'button') {
        button = /*#__PURE__*/external_window_React_["cloneElement"](enterButtonAsElement, Search_extends({
          onClick: _this.onSearch,
          key: 'enterButton'
        }, isAntdButton ? {
          className: btnClassName,
          size: size
        } : {}));
      } else {
        button = /*#__PURE__*/external_window_React_["createElement"](es_button, {
          className: btnClassName,
          type: "primary",
          size: size,
          disabled: disabled,
          key: "enterButton",
          onClick: _this.onSearch
        }, enterButton === true ? /*#__PURE__*/external_window_React_["createElement"](es_icon, {
          type: "search"
        }) : enterButton);
      }
      if (addonAfter) {
        return [button, /*#__PURE__*/ /*#__PURE__*/external_window_React_["isValidElement"](addonAfter) ? /*#__PURE__*/external_window_React_["cloneElement"](addonAfter, {
          key: 'addonAfter'
        }) : null];
      }
      return button;
    };
    _this.renderSearch = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls;
      var _a = _this.props,
        customizePrefixCls = _a.prefixCls,
        customizeInputPrefixCls = _a.inputPrefixCls,
        size = _a.size,
        enterButton = _a.enterButton,
        className = _a.className,
        restProps = Search_rest(_a, ["prefixCls", "inputPrefixCls", "size", "enterButton", "className"]);
      delete restProps.onSearch;
      delete restProps.loading;
      var prefixCls = getPrefixCls('input-search', customizePrefixCls);
      var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
      var inputClassName;
      if (enterButton) {
        var _classNames;
        inputClassName = _classnames_2_2_6_classnames_default()(prefixCls, className, (_classNames = {}, Search_defineProperty(_classNames, "".concat(prefixCls, "-enter-button"), !!enterButton), Search_defineProperty(_classNames, "".concat(prefixCls, "-").concat(size), !!size), _classNames));
      } else {
        inputClassName = _classnames_2_2_6_classnames_default()(prefixCls, className);
      }
      return /*#__PURE__*/external_window_React_["createElement"](input_Input, Search_extends({
        onPressEnter: _this.onSearch
      }, restProps, {
        size: size,
        prefixCls: inputPrefixCls,
        addonAfter: _this.renderAddonAfter(prefixCls),
        suffix: _this.renderSuffix(prefixCls),
        onChange: _this.onChange,
        ref: _this.saveInput,
        className: inputClassName
      }));
    };
    return _this;
  }