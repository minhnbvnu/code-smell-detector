function definePluralFn(locales, fn) {
    for (let i = 0, len = locales.length; i < len; i++) {
        PLURALS[locales[i]] = fn;
    }
}