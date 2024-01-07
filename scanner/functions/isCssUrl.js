function isCssUrl(str) {
    if (!isString(str)) {
        return 0;
    }
    if (cssUrlRe.test(str)) {
        return 1;
    }
    if (cssUrlReWithQuote.test(str)) {
        return 2;
    }
    return 3;
}