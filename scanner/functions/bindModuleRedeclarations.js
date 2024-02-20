function bindModuleRedeclarations(modDecls, env) {
    modDecls.forEach(function(name, node) {
        let def = env.lookup(name);
        if (def.type !== MODULE_DEF)
            throw new ReferenceError("attempt to redeclare variable " + name + " as a module");
        env.bindUnique(name, def);
    });
}