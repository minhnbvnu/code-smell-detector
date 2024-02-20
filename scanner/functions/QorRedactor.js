function QorRedactor(element, options) {
    this.$element = $(element);
    this.options = $.extend(
      true,
      {},
      QorRedactor.DEFAULTS,
      $.isPlainObject(options) && options
    );
    this.init();
  }