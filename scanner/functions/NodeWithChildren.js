function NodeWithChildren(type, children) {
    var _this = _super.call(this, type) || this;
    _this.children = children;
    return _this;
  }