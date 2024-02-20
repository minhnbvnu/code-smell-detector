function srcValueParse (value) {
    var list = [];
    var src;

    RE_FONT_URL.lastIndex = 0;
    while ((src = RE_FONT_URL.exec(value)) !== null) {

        src = src[1];
        src = unquotation(src.trim());
        //src = normalize(src);

        list.push(src);
    }

    return list;
}