function QorSelectMany(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorSelectMany.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }