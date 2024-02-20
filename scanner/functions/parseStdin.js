function parseStdin(s, ln, prefix, isCommand) {
    // the special .begin command is only recognized at the beginning
    if (s.match(/^[\s]*\.begin[\s]*$/)) {
        ++ln.value;
        return parseMultiline(ln, prefix);
    }

    // commands at the beginning are treated as the entire input
    if (isCommand(s.trim()))
        s = "";

    for (;;) {
        try {
            var t = new Tokenizer(s, "stdin", ln.value, false);
            var p = new Parser(t);
            var n = p.Script(false, false);
            ln.value = t.lineno;
            return n;
        } catch (e) {
            if (!p.unexpectedEOF)
                throw e;

            // commands in the middle are not treated as part of the input
            var more;
            do {
                if (prefix)
                    putstr(prefix);
                more = readline();
                if (!more)
                    throw e;
            } while (isCommand(more.trim()));

            s += "\n" + more;
        }
    }
}