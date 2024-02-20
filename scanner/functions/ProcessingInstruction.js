function ProcessingInstruction(name, data) {
    var _this = _super.call(this, domelementtype_1.ElementType.Directive, data) || this;
    _this.name = name;
    return _this;
  }