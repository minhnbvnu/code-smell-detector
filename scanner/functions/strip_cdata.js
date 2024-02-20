function strip_cdata (src) {
    var patt    = /^\s*<!\[CDATA\[([\s\S]*)\]\]>\s*$/,
        matches = src.match (patt);

    if (matches && matches[1])
        return matches[1];
    else
        return src;
}