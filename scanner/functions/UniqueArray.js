function UniqueArray(value) {
    _classCallCheck(this, UniqueArray);

    this.data = [];
    if (value instanceof Array) {
      for (var x in value) {
        this.push(value[x]);
      }
    }
  }