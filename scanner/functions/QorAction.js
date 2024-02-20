function QorAction(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, QorAction.DEFAULTS, $.isPlainObject(options) && options);
        this.ajaxForm = {};
        this.init();
    }