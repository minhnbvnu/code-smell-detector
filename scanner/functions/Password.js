function Password() {
    var _this;
    Password_classCallCheck(this, Password);
    _this = _super.apply(this, arguments);
    _this.state = {
      visible: false
    };
    _this.onVisibleChange = function () {
      var disabled = _this.props.disabled;
      if (disabled) {
        return;
      }
      _this.setState(function (_ref) {
        var visible = _ref.visible;
        return {
          visible: !visible
        };
      });
    };
    _this.saveInput = function (instance) {
      if (instance && instance.input) {
        _this.input = instance.input;
      }
    };
    return _this;
  }