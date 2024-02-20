function ContainerRender() {
    var _this;
    ContainerRender_classCallCheck(this, ContainerRender);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.removeContainer = function () {
      if (_this.container) {
        external_window_ReactDOM_default.a.unmountComponentAtNode(_this.container);
        _this.container.parentNode.removeChild(_this.container);
        _this.container = null;
      }
    };
    _this.renderComponent = function (props, ready) {
      var _this$props = _this.props,
        visible = _this$props.visible,
        getComponent = _this$props.getComponent,
        forceRender = _this$props.forceRender,
        getContainer = _this$props.getContainer,
        parent = _this$props.parent;
      if (visible || parent._component || forceRender) {
        if (!_this.container) {
          _this.container = getContainer();
        }
        external_window_ReactDOM_default.a.unstable_renderSubtreeIntoContainer(parent, getComponent(props), _this.container, function callback() {
          if (ready) {
            ready.call(this);
          }
        });
      }
    };
    return _this;
  }