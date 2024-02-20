function QorFilterTime(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorFilterTime.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }