constructor() {
    super();
    this.resizePane = this.resizePane.bind(this);
    this.resizeStopped = this.resizeStopped.bind(this);
    this.subscribeToDOMEvents();
  }