function GameBoyCanvas() {
  this.getContext = function() {
    return new GameBoyContext();
  }
  this.width = 160;
  this.height = 144;
  this.style = { visibility: "visibile" };
}