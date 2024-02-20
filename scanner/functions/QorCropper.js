function QorCropper(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, QorCropper.DEFAULTS, $.isPlainObject(options) && options);
        this.data = null;
        this.init();
    }