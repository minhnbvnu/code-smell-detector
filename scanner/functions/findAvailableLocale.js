function findAvailableLocale(desiredLocale, availableLocales) {
    if (availableLocales[desiredLocale]) {
        return desiredLocale;
    }

    let fallback = DEFAULT_LOCALE_FALLBACKS[desiredLocale];
    if (fallback && availableLocales[fallback]) {
        return fallback;
    }

    const lang = getLang(desiredLocale);

    fallback = DEFAULT_LOCALE_FALLBACKS[lang];
    if (availableLocales[fallback]) {
        return fallback;
    }

    if (availableLocales[lang]) {
        return lang;
    }

    return DEFAULT_LOCALE;
}