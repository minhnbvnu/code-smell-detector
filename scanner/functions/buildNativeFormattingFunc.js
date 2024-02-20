function buildNativeFormattingFunc(standardDateProps, extendedSettings, context) {
        standardDateProps = __assign({}, standardDateProps); // copy
        extendedSettings = __assign({}, extendedSettings); // copy
        sanitizeSettings(standardDateProps, extendedSettings);
        standardDateProps.timeZone = 'UTC'; // we leverage the only guaranteed timeZone for our UTC markers
        var normalFormat = new Intl.DateTimeFormat(context.locale.codes, standardDateProps);
        var zeroFormat; // needed?
        if (extendedSettings.omitZeroMinute) {
            var zeroProps = __assign({}, standardDateProps);
            delete zeroProps.minute; // seconds and ms were already considered in sanitizeSettings
            zeroFormat = new Intl.DateTimeFormat(context.locale.codes, zeroProps);
        }
        return function (date) {
            var marker = date.marker;
            var format;
            if (zeroFormat && !marker.getUTCMinutes()) {
                format = zeroFormat;
            }
            else {
                format = normalFormat;
            }
            var s = format.format(marker);
            return postProcess(s, date, standardDateProps, extendedSettings, context);
        };
    }