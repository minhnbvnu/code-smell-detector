function QorSlideout(element, options) {
    this.$element = $(element);
    this.options = $.extend(
      {},
      QorSlideout.DEFAULTS,
      $.isPlainObject(options) && options
    );
    this.slided = false;
    this.disabled = false;
    this.slideoutType = false;
    this.init();
  }