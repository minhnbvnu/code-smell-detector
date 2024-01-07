function getLang(locale) {
    const idx = locale.indexOf('-');
    if (idx !== -1) {
        return locale.substring(0, idx);
    }

    return locale;
}