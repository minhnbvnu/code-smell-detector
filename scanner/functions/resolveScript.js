function resolveScript(node, env) {
    let funDecls = node.funDecls;
    for (let i = 0; i < funDecls.length; i++) {
        let decl = funDecls[i];
        env.bind(decl.name, new Def(FUN_DEF, decl));
    }

    let varDecls = node.varDecls;
    for (let i = 0; i < varDecls.length; i++) {
        let decl = varDecls[i];
        env.bind(decl.name, new Def(VAR_DEF, decl));
    }

    if (env.type !== FUNCTION_FRAME) {
        node.modDefns.forEach(function(id, defn) {
            env.bindUnique(id, new Def(MODULE_DEF, defn.module));
        });

        bindModuleRedeclarations(node.modDecls, env);
        bindModuleAssignments(node.modAssns, env);
        bindModuleLoads(node.modLoads, env);

        bindImports(node.impDecls, env);
    }

    resolveStatements(node, env);
}