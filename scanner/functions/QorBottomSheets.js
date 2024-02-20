function QorBottomSheets(element, options) {
    this.$element = $(element);
    this.options = $.extend(
      {},
      QorBottomSheets.DEFAULTS,
      $.isPlainObject(options) && options
    );
    this.resourseData = {};
    this.init();
  }