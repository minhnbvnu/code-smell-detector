function SimpleHandlebarsView(path, pathRoot, isEscaped, templateData) {
  this.path = path;
  this.pathRoot = pathRoot;
  this.isEscaped = isEscaped;
  this.templateData = templateData;

  this.morph = Metamorph();
  this.state = 'preRender';
  this.updateId = null;
  this._parentView = null;
  this.buffer = null;
}