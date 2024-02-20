function Tooltip(props) {
    var _this;
    tooltip_classCallCheck(this, Tooltip);
    _this = _super.call(this, props);
    _this.onVisibleChange = function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: _this.isNoTitle() ? false : visible
        });
      }
      if (onVisibleChange && !_this.isNoTitle()) {
        onVisibleChange(visible);
      }
    };
    _this.saveTooltip = function (node) {
      _this.tooltip = node;
    }; // 动态设置动画点

    _this.onPopupAlign = function (domNode, align) {
      var placements = _this.getPlacements(); // 当前返回的位置

      var placement = Object.keys(placements).filter(function (key) {
        return placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1];
      })[0];
      if (!placement) {
        return;
      } // 根据当前坐标设置动画点

      var rect = domNode.getBoundingClientRect();
      var transformOrigin = {
        top: '50%',
        left: '50%'
      };
      if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
        transformOrigin.top = "".concat(rect.height - align.offset[1], "px");
      } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
        transformOrigin.top = "".concat(-align.offset[1], "px");
      }
      if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
        transformOrigin.left = "".concat(rect.width - align.offset[0], "px");
      } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
        transformOrigin.left = "".concat(-align.offset[0], "px");
      }
      domNode.style.transformOrigin = "".concat(transformOrigin.left, " ").concat(transformOrigin.top);
    };
    _this.renderTooltip = function (_ref) {
      var getContextPopupContainer = _ref.getPopupContainer,
        getPrefixCls = _ref.getPrefixCls;
      var _assertThisInitialize = tooltip_assertThisInitialized(_this),
        props = _assertThisInitialize.props,
        state = _assertThisInitialize.state;
      var customizePrefixCls = props.prefixCls,
        openClassName = props.openClassName,
        getPopupContainer = props.getPopupContainer,
        getTooltipContainer = props.getTooltipContainer;
      var children = props.children;
      var prefixCls = getPrefixCls('tooltip', customizePrefixCls);
      var visible = state.visible; // Hide tooltip when there is no title

      if (!('visible' in props) && _this.isNoTitle()) {
        visible = false;
      }
      var child = getDisabledCompatibleChildren( /*#__PURE__*/ /*#__PURE__*/external_window_React_["isValidElement"](children) ? children : /*#__PURE__*/external_window_React_["createElement"]("span", null, children));
      var childProps = child.props;
      var childCls = _classnames_2_2_6_classnames_default()(childProps.className, tooltip_defineProperty({}, openClassName || "".concat(prefixCls, "-open"), true));
      return /*#__PURE__*/external_window_React_["createElement"](_rc_tooltip_3_7_3_rc_tooltip_es, tooltip_extends({}, _this.props, {
        prefixCls: prefixCls,
        getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
        ref: _this.saveTooltip,
        builtinPlacements: _this.getPlacements(),
        overlay: _this.getOverlay(),
        visible: visible,
        onVisibleChange: _this.onVisibleChange,
        onPopupAlign: _this.onPopupAlign
      }), visible ? /*#__PURE__*/external_window_React_["cloneElement"](child, {
        className: childCls
      }) : child);
    };
    _this.state = {
      visible: !!props.visible || !!props.defaultVisible
    };
    return _this;
  }