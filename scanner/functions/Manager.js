function Manager() {
      this.controllers = [];
      this.bind('change', this.change);
      this.add.apply(this, arguments);
    }