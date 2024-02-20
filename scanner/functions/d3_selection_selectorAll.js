function d3_selection_selectorAll(selector) {
    return function() {
      return d3_selectAll(selector, this);
    };
  }