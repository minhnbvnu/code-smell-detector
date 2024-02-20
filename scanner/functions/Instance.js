function Instance(template, Transparency) {
    this.Transparency = Transparency;
    this.queryCache = {};
    this.childNodes = _.toArray(template.childNodes);
    this.elements = helpers.getElements(template);
  }