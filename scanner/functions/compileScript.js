function compileScript(node, proc, env) {
    for (var a = node.body.funDecls, n = a.length, i = 0; i < n; i++) {
        var fnode = a[i];
        proc.add(Lambda(fnode));
        proc.add(SetVar(fnode.name));
    }
    compileStatement(node.body, proc, env);
    proc.add(Undefined);
    proc.add(Mode({ unwind: [], goal: RETURN_GOAL }));
    proc.add(Unwind);
}