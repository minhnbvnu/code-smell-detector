function QorSelectOne(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorSelectOne.DEFAULTS, $.isPlainObject(options) && options);
        this.init();
    }