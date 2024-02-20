function ignoredNode(node) {
  return node.nodeType === Node.COMMENT_NODE
      || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE
      || (node.nodeType === Node.ELEMENT_NODE && getComputedStyle(node, null).getPropertyValue('display') === 'none')
}