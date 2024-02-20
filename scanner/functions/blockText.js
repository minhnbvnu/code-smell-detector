function blockText(block, ignoreNewLines) {
    return Array.prototype.map.call(block.childNodes, function(node) {
      if (node.nodeType == 3) {
        return ignoreNewLines ? node.nodeValue.replace(/\n/g, '') : node.nodeValue;
      }
      if (node.nodeName.toUpperCase () == 'BR') {
        return '\n';
      }
      return blockText(node, ignoreNewLines);
    }).join('');
  }