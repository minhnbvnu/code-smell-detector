function parseMultiline(ln, prefix) {
    var s = "";
    for (;;) {
        if (prefix)
            putstr(prefix);
        var more = readline();
        if (more === null)
            return null;
        // the only command recognized in multiline mode is .end
        if (more.match(/^[\s]*\.end[\s]*$/))
            break;
        s += "\n" + more;
    }
    var t = new Tokenizer(s, "stdin", ln.value, false);
    var p = new Parser(t);
    var n = p.Script(false, false);
    ln.value = t.lineno;
    return n;
}