constructor(params) {
    const dict = params.dict;
    this.setContents(dict.get("Contents"));
    this.setModificationDate(dict.get("M"));
    this.setFlags(dict.get("F"));
    this.setRectangle(dict.getArray("Rect"));
    this.setColor(dict.getArray("C"));
    this.setBorderStyle(dict);
    this.setAppearance(dict);
    this._streams = [];

    if (this.appearance) {
      this._streams.push(this.appearance);
    }

    this.data = {
      annotationFlags: this.flags,
      borderStyle: this.borderStyle,
      color: this.color,
      contents: this.contents,
      hasAppearance: !!this.appearance,
      id: params.id,
      modificationDate: this.modificationDate,
      rect: this.rectangle,
      subtype: params.subtype
    };

    if (params.collectFields) {
      const kids = dict.get("Kids");

      if (Array.isArray(kids)) {
        const kidIds = [];

        for (const kid of kids) {
          if ((0, _primitives.isRef)(kid)) {
            kidIds.push(kid.toString());
          }
        }

        if (kidIds.length !== 0) {
          this.data.kidIds = kidIds;
        }
      }

      this.data.actions = (0, _core_utils.collectActions)(params.xref, dict, _util.AnnotationActionEventType);
      this.data.fieldName = this._constructFieldName(dict);
    }

    this._fallbackFontDict = null;
  }