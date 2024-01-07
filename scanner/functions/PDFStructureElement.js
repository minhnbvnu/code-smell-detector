constructor(document, type, options = {}, children = null) {
    this.document = document;

    this._attached = false;
    this._ended = false;
    this._flushed = false;
    this.dictionary = document.ref({
      // Type: "StructElem",
      S: type
    });

    const data = this.dictionary.data;

    if (Array.isArray(options) || this._isValidChild(options)) {
      children = options;
      options = {};
    }

    if (typeof options.title !== 'undefined') {
      data.T = new String(options.title);
    }
    if (typeof options.lang !== 'undefined') {
      data.Lang = new String(options.lang);
    }
    if (typeof options.alt !== 'undefined') {
      data.Alt = new String(options.alt);
    }
    if (typeof options.expanded !== 'undefined') {
      data.E = new String(options.expanded);
    }
    if (typeof options.actual !== 'undefined') {
      data.ActualText = new String(options.actual);
    }

    this._children = [];

    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      children.forEach((child) => this.add(child));
      this.end();
    }
  }