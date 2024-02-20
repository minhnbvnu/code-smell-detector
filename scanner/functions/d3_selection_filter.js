function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }