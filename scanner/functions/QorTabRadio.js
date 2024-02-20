function QorTabRadio(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, QorTabRadio.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }