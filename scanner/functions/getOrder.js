function getOrder(line) {
  var order = line.order;
  if (order == null) { order = line.order = bidiOrdering(line.text); }
  return order
}