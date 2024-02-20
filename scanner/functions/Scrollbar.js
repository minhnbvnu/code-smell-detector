function Scrollbar() {
  Component.apply(this, arguments);

  // used together with jquery
  this.onMouseUp = this.onMouseUp.bind(this);
  this.onMouseMove = this.onMouseMove.bind(this);
}