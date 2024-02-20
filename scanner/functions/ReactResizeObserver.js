function ReactResizeObserver() {
    var _this;
    _classCallCheck(this, ReactResizeObserver);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactResizeObserver).apply(this, arguments));
    _this.resizeObserver = null;
    _this.childNode = null;
    _this.currentElement = null;
    _this.state = {
      width: 0,
      height: 0
    };
    _this.onResize = function (entries) {
      var onResize = _this.props.onResize;
      var target = entries[0].target;
      var _target$getBoundingCl = target.getBoundingClientRect(),
        width = _target$getBoundingCl.width,
        height = _target$getBoundingCl.height;
      /**
       * Resize observer trigger when content size changed.
       * In most case we just care about element size,
       * let's use `boundary` instead of `contentRect` here to avoid shaking.
       */

      var fixedWidth = Math.floor(width);
      var fixedHeight = Math.floor(height);
      if (_this.state.width !== fixedWidth || _this.state.height !== fixedHeight) {
        var size = {
          width: fixedWidth,
          height: fixedHeight
        };
        _this.setState(size);
        if (onResize) {
          onResize(size);
        }
      }
    };
    _this.setChildNode = function (node) {
      _this.childNode = node;
    };
    return _this;
  }