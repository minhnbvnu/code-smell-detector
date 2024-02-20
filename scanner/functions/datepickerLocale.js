function datepickerLocale(localeCode, dpLocaleCode, dpOptions) {
    // get the FullCalendar internal option hash for this locale. create if necessary
    var fcOptions = exports.localeOptionHash[localeCode] || (exports.localeOptionHash[localeCode] = {});
    // transfer some simple options from datepicker to fc
    fcOptions.isRTL = dpOptions.isRTL;
    fcOptions.weekNumberTitle = dpOptions.weekHeader;
    // compute some more complex options from datepicker
    $.each(dpComputableOptions, function (name, func) {
        fcOptions[name] = func(dpOptions);
    });
    var jqDatePicker = $.datepicker;
    // is jQuery UI Datepicker is on the page?
    if (jqDatePicker) {
        // Register the locale data.
        // FullCalendar and MomentJS use locale codes like "pt-br" but Datepicker
        // does it like "pt-BR" or if it doesn't have the locale, maybe just "pt".
        // Make an alias so the locale can be referenced either way.
        jqDatePicker.regional[dpLocaleCode] =
            jqDatePicker.regional[localeCode] = // alias
                dpOptions;
        // Alias 'en' to the default locale data. Do this every time.
        jqDatePicker.regional.en = jqDatePicker.regional[''];
        // Set as Datepicker's global defaults.
        jqDatePicker.setDefaults(dpOptions);
    }
}