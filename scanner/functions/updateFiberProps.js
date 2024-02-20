function updateFiberProps(node, props) {
  node[internalEventHandlersKey] = props;
}