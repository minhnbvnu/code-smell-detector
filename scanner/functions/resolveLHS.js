function resolveLHS(node, env) {
    // BUG 620819: handle destructuring
    if (node.type !== DOT && node.type !== INDEX && node.type !== IDENTIFIER)
        throw new SyntaxError("assignment to computed expression");

    var def = resolvePath(node, env);
    if (def)
        throw new SyntaxError("assignment to imported variable: " + def);
}