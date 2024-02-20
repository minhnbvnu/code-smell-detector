function warnColumnEnumDeprecation(method, msg) {
    if (!warned[method]) {
        console.warn('.' + method + ' has been deprecated as of v3.0.0. (Will be removed in a future release.) ' + (msg || ''));
        warned[method] = true;
    }
}