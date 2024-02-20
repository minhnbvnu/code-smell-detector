function parseLocale(codeArg, codes, raw) {
        var merged = mergeProps([RAW_EN_LOCALE, raw], ['buttonText']);
        delete merged.code; // don't want this part of the options
        var week = merged.week;
        delete merged.week;
        return {
            codeArg: codeArg,
            codes: codes,
            week: week,
            simpleNumberFormat: new Intl.NumberFormat(codeArg),
            options: merged
        };
    }