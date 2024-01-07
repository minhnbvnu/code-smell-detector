function FileSpec(root, xref) {
    if (!root || !(0, _primitives.isDict)(root)) {
      return;
    }

    this.xref = xref;
    this.root = root;

    if (root.has("FS")) {
      this.fs = root.get("FS");
    }

    this.description = root.has("Desc") ? (0, _util.stringToPDFString)(root.get("Desc")) : "";

    if (root.has("RF")) {
      (0, _util.warn)("Related file specifications are not supported");
    }

    this.contentAvailable = true;

    if (!root.has("EF")) {
      this.contentAvailable = false;
      (0, _util.warn)("Non-embedded file specifications are not supported");
    }
  }