function getMomentLocaleData(localeCode) {
    return moment.localeData(localeCode) || moment.localeData('en');
}