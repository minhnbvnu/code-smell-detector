function _matches(el, selectors) {
    return (
      selectors.filter(function(selector) {
        return [].indexOf.call(document.querySelectorAll(selector), el) !== -1;
      }).length > 0
    );
  }