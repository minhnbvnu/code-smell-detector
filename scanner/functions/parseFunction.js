function parseFunction(s, requireName, form, f, l) {
    var t = new Tokenizer(s, f, l);
    var p = new Parser(t);
    p.x = new StaticContext(null, null, false, false, false);
    return p.FunctionDefinition(requireName, form);
}