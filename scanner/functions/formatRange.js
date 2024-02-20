function formatRange(date1, date2, formatStr, separator, isRTL) {
    var localeData;
    date1 = moment_ext_1.default.parseZone(date1);
    date2 = moment_ext_1.default.parseZone(date2);
    localeData = date1.localeData();
    // Expand localized format strings, like "LL" -> "MMMM D YYYY".
    // BTW, this is not important for `formatDate` because it is impossible to put custom tokens
    // or non-zero areas in Moment's localized format strings.
    formatStr = localeData.longDateFormat(formatStr) || formatStr;
    return renderParsedFormat(getParsedFormatString(formatStr), date1, date2, separator || ' - ', isRTL);
}