function sqlQuote (arg) {
    return '"' + sqlEscape(arg) + '"';
}