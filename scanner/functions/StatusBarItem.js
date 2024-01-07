constructor() {
    this.element = document.createElement('a');
    this.element.className = 'line-ending-tile inline-block';
    this.emitter = new Emitter();
    this.setLineEndings(new Set());
  }