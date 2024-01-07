constructor(windows = []) {
    this.addWindow = this.addWindow.bind(this);
    this.touch = this.touch.bind(this);
    this.removeWindow = this.removeWindow.bind(this);
    this.getLastFocusedWindow = this.getLastFocusedWindow.bind(this);
    this.all = this.all.bind(this);
    this.windows = windows;
  }