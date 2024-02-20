function evaluateTruthy() {
  const res = this.evaluate();
  if (res.confident) return !!res.value;
}