function QorSelectCore(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorSelectCore.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }