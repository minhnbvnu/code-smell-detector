function alpha(cssColorSpec) {
    var matches, result;

    if (!cssColorSpec) {
        // undefined so not visible; treat as transparent
        result = 0;
    } else if ((matches = cssColorSpec.match(ALPHA_REGEX)) === null) {
        // an opaque color (a color spec with no alpha channel)
        result = 1;
    } else if (matches[4] === undefined) {
        // cssColorSpec must have been 'transparent'
        result = 0;
    } else {
        result = Number(matches[4]);
    }

    return result;
}