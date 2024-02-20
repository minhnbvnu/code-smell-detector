function ResizableTextArea(props) {
    var _this;
    ResizableTextArea_classCallCheck(this, ResizableTextArea);
    _this = _super.call(this, props);
    _this.saveTextArea = function (textArea) {
      _this.textArea = textArea;
    };
    _this.resizeOnNextFrame = function () {
      wrapperRaf.cancel(_this.nextFrameActionId);
      _this.nextFrameActionId = wrapperRaf(_this.resizeTextarea);
    };
    _this.resizeTextarea = function () {
      var autoSize = _this.props.autoSize || _this.props.autosize;
      if (!autoSize || !_this.textArea) {
        return;
      }
      var minRows = autoSize.minRows,
        maxRows = autoSize.maxRows;
      var textareaStyles = calculateNodeHeight(_this.textArea, false, minRows, maxRows);
      _this.setState({
        textareaStyles: textareaStyles,
        resizing: true
      }, function () {
        wrapperRaf.cancel(_this.resizeFrameId);
        _this.resizeFrameId = wrapperRaf(function () {
          _this.setState({
            resizing: false
          });
          _this.fixFirefoxAutoScroll();
        });
      });
    };
    _this.renderTextArea = function () {
      var _this$props = _this.props,
        prefixCls = _this$props.prefixCls,
        autoSize = _this$props.autoSize,
        autosize = _this$props.autosize,
        className = _this$props.className,
        disabled = _this$props.disabled;
      var _this$state = _this.state,
        textareaStyles = _this$state.textareaStyles,
        resizing = _this$state.resizing;
      _util_warning(autosize === undefined, 'Input.TextArea', 'autosize is deprecated, please use autoSize instead.');
      var otherProps = _omit_js_1_0_2_omit_js_es(_this.props, ['prefixCls', 'onPressEnter', 'autoSize', 'autosize', 'defaultValue', 'allowClear']);
      var cls = _classnames_2_2_6_classnames_default()(prefixCls, className, ResizableTextArea_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled)); // Fix https://github.com/ant-design/ant-design/issues/6776
      // Make sure it could be reset when using form.getFieldDecorator

      if ('value' in otherProps) {
        otherProps.value = otherProps.value || '';
      }
      var style = ResizableTextArea_extends(ResizableTextArea_extends(ResizableTextArea_extends({}, _this.props.style), textareaStyles), resizing ? {
        overflowX: 'hidden',
        overflowY: 'hidden'
      } : null);
      return /*#__PURE__*/external_window_React_["createElement"](es_default.a, {
        onResize: _this.resizeOnNextFrame,
        disabled: !(autoSize || autosize)
      }, /*#__PURE__*/external_window_React_["createElement"]("textarea", ResizableTextArea_extends({}, otherProps, {
        className: cls,
        style: style,
        ref: _this.saveTextArea
      })));
    };
    _this.state = {
      textareaStyles: {},
      resizing: false
    };
    return _this;
  }