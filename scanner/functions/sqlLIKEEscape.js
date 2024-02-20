function sqlLIKEEscape (str) {
    // https://www.sqlite.org/lang_expr.html#like
    return sqlEscape(str).replaceAll('^', '^^');
}