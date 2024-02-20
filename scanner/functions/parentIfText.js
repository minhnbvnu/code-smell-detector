function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode;
  }