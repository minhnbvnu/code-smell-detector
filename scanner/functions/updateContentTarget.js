function updateContentTarget(value) {
  // If there's no actual value, then this equates to the
  // empty string for the purposes of content bindings.
  if (value === null || value === undefined) {
    value = "";
  } // If the value has a "create" method, then it's a template-like.


  if (value.create) {
    this.target.textContent = "";
    let view = this.target.$fastView; // If there's no previous view that we might be able to
    // reuse then create a new view from the template.

    if (view === void 0) {
      view = value.create();
    } else {
      // If there is a previous view, but it wasn't created
      // from the same template as the new value, then we
      // need to remove the old view if it's still in the DOM
      // and create a new view from the template.
      if (this.target.$fastTemplate !== value) {
        if (view.isComposed) {
          view.remove();
          view.unbind();
        }

        view = value.create();
      }
    } // It's possible that the value is the same as the previous template
    // and that there's actually no need to compose it.


    if (!view.isComposed) {
      view.isComposed = true;
      view.bind(this.source, this.context);
      view.insertBefore(this.target);
      this.target.$fastView = view;
      this.target.$fastTemplate = value;
    } else if (view.needsBindOnly) {
      view.needsBindOnly = false;
      view.bind(this.source, this.context);
    }
  } else {
    const view = this.target.$fastView; // If there is a view and it's currently composed into
    // the DOM, then we need to remove it.

    if (view !== void 0 && view.isComposed) {
      view.isComposed = false;
      view.remove();

      if (view.needsBindOnly) {
        view.needsBindOnly = false;
      } else {
        view.unbind();
      }
    }

    this.target.textContent = value;
  }
}