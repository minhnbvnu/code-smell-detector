function Overlay(element, options) {
    this.element = element;
    if (typeof this.init === "function") {
      this.init(options);
    }
  }