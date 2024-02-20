function OverlayFactory(classes, canvas) {
    var div;
    this.classes = classes;
    this.canvas = canvas;
    div = document.createElement('div');
    div.classList.add('mathbox-overlays');
    this.div = div;
  }