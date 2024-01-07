constructor() {
    super();
    this.emitter = new Emitter();
    this.initialText = this.textContent;
    if (this.tabIndex == null) this.tabIndex = -1;
    this.addEventListener('focus', event =>
      this.getComponent().didFocus(event)
    );
    this.addEventListener('blur', event => this.getComponent().didBlur(event));
  }