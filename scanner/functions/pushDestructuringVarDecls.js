function pushDestructuringVarDecls(n, s) {
    for (var i in n) {
        var sub = n[i];
        if (sub.type === IDENTIFIER) {
            s.varDecls.push(sub);
        } else {
            pushDestructuringVarDecls(sub, s);
        }
    }
}