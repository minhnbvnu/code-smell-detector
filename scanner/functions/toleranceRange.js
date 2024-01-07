function toleranceRange(positive, negative) {
  const p = (1 + 1 / positive);
  const n = (1 / negative);

  return (actualValue, value) => {
    return actualValue - value > 0 ? actualValue < value * p : actualValue > value * n;
  }
}