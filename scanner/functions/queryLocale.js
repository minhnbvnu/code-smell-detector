function queryLocale(codeArg, available) {
        var codes = [].concat(codeArg || []); // will convert to array
        var raw = queryRawLocale(codes, available) || RAW_EN_LOCALE;
        return parseLocale(codeArg, codes, raw);
    }