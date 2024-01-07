function replaceLang(locale, desiredLang) {
    const idx = locale.indexOf('-');
    if (idx !== -1) {
        return desiredLang + locale.substring(idx);
    }

    return desiredLang;
}