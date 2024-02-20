function QorFilter(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorFilter.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }