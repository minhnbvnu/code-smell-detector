function d3_selection_selector(selector) {
    return function() {
      return d3_select(selector, this);
    };
  }