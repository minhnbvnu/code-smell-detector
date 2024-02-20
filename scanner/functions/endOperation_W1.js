function endOperation_W1(op) {
  op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
}