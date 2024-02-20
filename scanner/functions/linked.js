function linked(target) {
  if (target.data.prop) {
    this.data.formItems[target.data.prop] = target;
  }

  if (target.setInForm) {
    target.setInForm();
  }

  if (!this.data.firstItem) {
    this.data.firstItem = target;
  }
}