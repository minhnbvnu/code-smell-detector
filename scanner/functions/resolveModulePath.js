function resolveModulePath(env, path) {
    if (path.type === IDENTIFIER) {
        var def = env.lookup(path.value);
        if (def.type !== MODULE_DEF)
            throw new ReferenceError(path.value + " is not a module");
        path.denotedModule = def.binding;
        return def.binding;
    }

    var mod = resolveModulePath(env, path.children[0]);
    var name = path.children[1].value;
    // BUG 620824: better error message
    if (!mod.exportedModules.has(name))
        throw new ReferenceError("no exported module '" + name + "'");

    var mod2 = mod.exportedModules.get(name).module;
    path.denotedModule = mod2;
    return mod2;
}