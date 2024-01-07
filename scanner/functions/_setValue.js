function _setValue(templateNode, value) {
  if (!templateNode.value) {
    const nodeValue = new Value({});

    templateNode[_xfa_object.$appendChild](nodeValue);

    templateNode.value = nodeValue;
  }

  templateNode.value[_xfa_object.$setValue](value);
}