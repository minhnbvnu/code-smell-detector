function handleExistingNodes(selector, handler) {
        var nodeList = document.querySelectorAll(selector);
        var nodes = nodeListToArray(nodeList);
        handler(nodes);
      }