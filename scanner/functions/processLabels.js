function processLabels(node) {
  let labels = [];
  // we can have multiple labels in js
  // *universe collapses*
  while (true) {
    if (node.type === "LabeledStatement") {
      labels.push(node.label.name);
    } else if (isStatement(node.type)) {
      node.labels = labels;
      break;
    }
    node = node.body;
  };
  return node;
}