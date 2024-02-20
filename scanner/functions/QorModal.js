function QorModal(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorModal.DEFAULTS, $.isPlainObject(options) && options);
        this.transitioning = false;
        this.fadable = false;
        this.init();
    }