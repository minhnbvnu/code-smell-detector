function bindImports(impDecls, env) {
    for (let i = 0; i < impDecls.length; i++) {
        let list = impDecls[i].pathList;
        for (let j = 0; j < list.length; j++)
            bindImport(list[j], env);
    }
}