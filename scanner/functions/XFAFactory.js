constructor(data) {
    try {
      this.root = new _parser.XFAParser().parse(XFAFactory._createDocument(data));
      this.form = new _bind.Binder(this.root).bind();
      this.pages = this.form[_xfa_object.$toHTML]();
    } catch (e) {
      console.log(e);
    }
  }