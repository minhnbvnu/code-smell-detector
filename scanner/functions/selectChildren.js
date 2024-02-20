function selectChildren(selector, parent) {
      return parent ? Array.prototype.slice.call(parent.querySelectorAll(selector)) : [];
    }