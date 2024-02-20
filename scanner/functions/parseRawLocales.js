function parseRawLocales(explicitRawLocales) {
        var defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en';
        var globalArray = window['FullCalendarLocalesAll'] || []; // from locales-all.js
        var globalObject = window['FullCalendarLocales'] || {}; // from locales/*.js. keys are meaningless
        var allRawLocales = globalArray.concat(// globalArray is low prio
        hashValuesToArray(globalObject), // medium prio
        explicitRawLocales // highest prio
        );
        var rawLocaleMap = {
            en: RAW_EN_LOCALE // necessary?
        };
        for (var _i = 0, allRawLocales_1 = allRawLocales; _i < allRawLocales_1.length; _i++) {
            var rawLocale = allRawLocales_1[_i];
            rawLocaleMap[rawLocale.code] = rawLocale;
        }
        return {
            map: rawLocaleMap,
            defaultCode: defaultCode
        };
    }