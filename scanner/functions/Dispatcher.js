function Dispatcher() {
    this.on = bind(this.on, this);
  }