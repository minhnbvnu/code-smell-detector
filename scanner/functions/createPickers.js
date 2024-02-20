function createPickers(context) {
// XXXX this is called whenever a new form needs it, but could it just
// be done on a .click of the class if it isn't widgetized?
    $(".datetimeclass", context || document).datetimepicker({
            showSecond: true,
            showMillisecond: true,
            timeFormat: 'hh:mm:ss.l',
            dateFormat: 'yy-mm-dd',
        });
}