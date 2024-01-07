function _getLabelForValue(value) {
  const labels = this.getLabels();

  if (value >= 0 && value < labels.length) {
    return labels[value];
  }
  return value;
}