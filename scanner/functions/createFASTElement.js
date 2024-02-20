function createFASTElement(BaseType) {
  return class extends BaseType {
    constructor() {
      /* eslint-disable-next-line */
      super();
      Controller.forCustomElement(this);
    }

    $emit(type, detail, options) {
      return this.$fastController.emit(type, detail, options);
    }

    connectedCallback() {
      this.$fastController.onConnectedCallback();
    }

    disconnectedCallback() {
      this.$fastController.onDisconnectedCallback();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.$fastController.onAttributeChangedCallback(name, oldValue, newValue);
    }

  };
}