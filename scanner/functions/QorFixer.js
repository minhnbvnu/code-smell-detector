function QorFixer(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorFixer.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }