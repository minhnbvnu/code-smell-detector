function ReactZmage(props) {
    var _this;

    Zmage_classCallCheck(this, ReactZmage);

    _this = Zmage_possibleConstructorReturn(this, Zmage_getPrototypeOf(ReactZmage).call(this, props));

    Zmage_defineProperty(Zmage_assertThisInitialized(_this), "inBrowsing", function () {
      if (_this.isBrowsingControlled) {
        _this.props.onBrowsing(true);
      } else {
        _this.setState({
          browsing: true
        });
      }
    });

    Zmage_defineProperty(Zmage_assertThisInitialized(_this), "outBrowsing", function () {
      if (_this.isBrowsingControlled) {
        _this.props.onBrowsing(false);
      } else {
        _this.setState({
          browsing: false
        });
      }
    });

    _this.coverRef = external_react_default.a.createRef();
    _this.isBrowsingControlled = _this.props.hasOwnProperty('browsing');
    _this.state = {
      // 浏览
      browsing: false
    }; // TODO:FEATURE 按钮颜色配置
    // TODO:FEATURE 移动端的拖拽翻页
    // TODO:ENHANCE 禁用移动端的滑动退出
    // FIXME: Safari 全屏模式下无法锁定滚动

    return _this;
  }