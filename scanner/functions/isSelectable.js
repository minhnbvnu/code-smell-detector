function isSelectable(container) {
      var TEXT_NODE = 3;

      if (container && container.nodeType === TEXT_NODE && container.data.length !== 0) {
        return true;
      }
      return false;
    }