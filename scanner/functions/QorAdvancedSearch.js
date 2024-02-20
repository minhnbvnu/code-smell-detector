function QorAdvancedSearch(element, options) {
    this.$element = $(element);
    this.options = $.extend(
      {},
      QorAdvancedSearch.DEFAULTS,
      $.isPlainObject(options) && options
    );
    this.init();
  }