function CheckableFormAssociated(BaseCtor) {
  class C extends FormAssociated(BaseCtor) {}

  class D extends C {
    constructor(...args) {
      super(args);
      /**
       * Tracks whether the "checked" property has been changed.
       * This is necessary to provide consistent behavior with
       * normal input checkboxes
       */

      this.dirtyChecked = false;
      /**
       * Provides the default checkedness of the input element
       * Passed down to proxy
       *
       * @public
       * @remarks
       * HTML Attribute: checked
       */

      this.checkedAttribute = false;
      /**
       * The checked state of the control.
       *
       * @public
       */

      this.checked = false; // Re-initialize dirtyChecked because initialization of other values
      // causes it to become true

      this.dirtyChecked = false;
    }

    checkedAttributeChanged() {
      this.defaultChecked = this.checkedAttribute;
    }
    /**
     * @internal
     */


    defaultCheckedChanged() {
      if (!this.dirtyChecked) {
        // Setting this.checked will cause us to enter a dirty state,
        // but if we are clean when defaultChecked is changed, we want to stay
        // in a clean state, so reset this.dirtyChecked
        this.checked = this.defaultChecked;
        this.dirtyChecked = false;
      }
    }

    checkedChanged(prev, next) {
      if (!this.dirtyChecked) {
        this.dirtyChecked = true;
      }

      this.currentChecked = this.checked;
      this.updateForm();

      if (this.proxy instanceof HTMLInputElement) {
        this.proxy.checked = this.checked;
      }

      if (prev !== undefined) {
        this.$emit("change");
      }

      this.validate();
    }

    currentCheckedChanged(prev, next) {
      this.checked = this.currentChecked;
    }

    updateForm() {
      const value = this.checked ? this.value : null;
      this.setFormValue(value, value);
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateForm();
    }

    formResetCallback() {
      super.formResetCallback();
      this.checked = !!this.checkedAttribute;
      this.dirtyChecked = false;
    }

  }

  attr({
    attribute: "checked",
    mode: "boolean"
  })(D.prototype, "checkedAttribute");
  attr({
    attribute: "current-checked",
    converter: booleanConverter
  })(D.prototype, "currentChecked");
  observable(D.prototype, "defaultChecked");
  observable(D.prototype, "checked");
  return D;
}