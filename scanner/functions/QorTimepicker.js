function QorTimepicker(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, QorTimepicker.DEFAULTS, $.isPlainObject(options) && options);
        this.formatDate = null;
        this.pickerData = this.$element.data();
        this.parent = this.$element.closest(CLASS_PARENT);
        this.isTimePicker = this.parent.data('picker-type') == 'time';
        this.isDateTimePicker = this.parent.data('picker-type') == 'datetime';
        this.$targetInput = this.parent.find(this.pickerData.targetInput || (this.isDateTimePicker || this.isTimePicker ? '.qor-datetimepicker__input' : '.qor-datepicker__input'));
        this.init();
    }