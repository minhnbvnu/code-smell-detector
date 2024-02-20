function Pattern(gState, matrix) {
  this.gState = gState;
  this.matrix = matrix;

  this.id = ""; // set by addPattern()
  this.objectNumber = -1; // will be set by putPattern()
}