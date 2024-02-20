function BooleanAttribute(el1, name1) {
    this.el = el1;
    this.name = name1;
    this.templateValue = this.el.getAttribute(this.name) || false;
  }