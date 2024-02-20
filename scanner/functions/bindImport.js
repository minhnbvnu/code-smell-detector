function bindImport(decl, env) {
    var m = resolveModulePath(env, decl.children[0]);
    var rhs = decl.children[1];

    function bind(importID, exportID) {
        if (m.exportedModules.has(exportID))
            throw new ReferenceError("'import' cannot bind modules; use 'module' instead");
        if (!m.exports.has(exportID))
            throw new ReferenceError("export " + exportID + " not found in " + m.displayName);
        env.bindUnique(importID, new Def(IMPORT_DEF, { module: m, id: exportID }));
    }

    if (rhs.type === IDENTIFIER) {
        if (rhs.value === "*") {
            m.exports.forEach(function(exportID, exp) {
                if (!m.exportedModules.has(exportID))
                    env.bindUnique(exportID, new Def(IMPORT_DEF, { module: m, id: exportID }));
            });
        } else {
            bind(rhs.value, rhs.value);
        }
        return;
    }

    for (var i = 0; i < rhs.children.length; i++) {
        var pair = rhs.children[i];
        bind(pair.children[1].value, pair.children[0].value);
    }
}