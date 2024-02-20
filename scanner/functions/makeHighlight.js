function makeHighlight() {
  const node = document.createElement('div');
  node.setAttribute('role', 'presentation');
  node.setAttribute('class', 'ember-inspector-render-highlight');
  return node;
}