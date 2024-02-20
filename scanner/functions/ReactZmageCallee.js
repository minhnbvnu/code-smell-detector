function ReactZmageCallee(props) {
    var _this;

    Zmage_callee_classCallCheck(this, ReactZmageCallee);

    _this = Zmage_callee_possibleConstructorReturn(this, Zmage_callee_getPrototypeOf(ReactZmageCallee).call(this, props));

    Zmage_callee_defineProperty(Zmage_callee_assertThisInitialized(_this), "outBrowsing", function () {
      var destroyer = _this.props.destroyer;

      _this.setState({
        browsing: false
      });

      setTimeout(destroyer, animationDuration);
    });

    _this.state = {
      browsing: true
    }; // 缓存打开位置

    MOUSE_POSITION_CACHE = MOUSE_POSITION_CURRENT;
    return _this;
  }