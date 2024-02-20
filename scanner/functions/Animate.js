function Animate(props) {
    classCallCheck_default()(this, Animate);
    var _this = possibleConstructorReturn_default()(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));
    Animate_initialiseProps.call(_this);
    _this.currentlyAnimatingKeys = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.state = {
      children: toArrayChildren(getChildrenFromProps(props))
    };
    _this.childrenRefs = {};
    return _this;
  }