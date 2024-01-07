constructor(pdfManager, xref) {
    this.pdfManager = pdfManager;
    this.xref = xref;
    this._catDict = xref.getCatalogObj();

    if (!(0, _primitives.isDict)(this._catDict)) {
      throw new _util.FormatError("Catalog object is not a dictionary.");
    }

    this.fontCache = new _primitives.RefSetCache();
    this.builtInCMapCache = new Map();
    this.globalImageCache = new _image_utils.GlobalImageCache();
    this.pageKidsCountCache = new _primitives.RefSetCache();
    this.nonBlendModesSet = new _primitives.RefSet();
  }