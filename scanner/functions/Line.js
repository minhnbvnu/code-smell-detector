function Line(text, styles) {
    this.styles = styles || [text, null];
    this.text = text;
    this.height = 1;
    this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
    this.stateAfter = this.parent = this.hidden = null;
  }