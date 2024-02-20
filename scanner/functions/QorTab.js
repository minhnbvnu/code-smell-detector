function QorTab(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, QorTab.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }