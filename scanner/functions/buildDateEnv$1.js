function buildDateEnv$1(settings) {
        var locale = buildLocale(settings.locale || 'en', parseRawLocales([]).map); // TODO: don't hardcode 'en' everywhere
        // ensure required settings
        settings = __assign({ timeZone: globalDefaults.timeZone, calendarSystem: 'gregory' }, settings, { locale: locale });
        return new DateEnv(settings);
    }