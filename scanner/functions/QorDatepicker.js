function QorDatepicker(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, QorDatepicker.DEFAULTS, $.isPlainObject(options) && options);
        this.date = null;
        this.formatDate = null;
        this.built = false;
        this.pickerData = this.$element.data();
        this.$parent = this.$element.closest(CLASS_PARENT);
        this.isDateTimePicker = this.$parent.data('picker-type') == 'datetime';
        this.$targetInput = this.$parent.find(this.pickerData.targetInput || (this.isDateTimePicker ? '.qor-datetimepicker__input' : '.qor-datepicker__input'));
        this.init();
    }