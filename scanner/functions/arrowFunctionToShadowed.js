function arrowFunctionToShadowed() {
  if (!this.isArrowFunctionExpression()) return;
  this.arrowFunctionToExpression();
}