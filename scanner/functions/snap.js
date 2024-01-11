function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}