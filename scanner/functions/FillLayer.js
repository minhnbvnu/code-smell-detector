function FillLayer(width1, height1, fill1) {
    this.width = width1 != null ? width1 : 500;
    this.height = height1 != null ? height1 : 500;
    this.fill = fill1 != null ? fill1 : '#EEE';
    this.render = bind(this.render, this);
  }