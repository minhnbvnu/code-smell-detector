function QorAutoheight(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, QorAutoheight.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }