function advancedAPI() {
    // prepend global change of basis matrix
    // (Now, instead of converting every coordinate to the pdf coordinate system, we apply a matrix
    // that does this job for us (however, texts, images and similar objects must be drawn bottom up))
    this.saveGraphicsState();
    out(
      new Matrix(
        scaleFactor,
        0,
        0,
        -scaleFactor,
        0,
        getPageHeight() * scaleFactor
      ).toString() + " cm"
    );
    this.setFontSize(this.getFontSize() / scaleFactor);

    // The default in MrRio's implementation is "S" (stroke), whereas the default in the yWorks implementation
    // was "n" (none). Although this has nothing to do with transforms, we should use the API switch here.
    defaultPathOperation = "n";

    apiMode = ApiMode.ADVANCED;
  }