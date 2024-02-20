function linkExport(mod, exp, visited) {
        if (exp.resolved)
            return exp.resolved;

        visited.push({ mod: mod, exp: exp });

        if (exp.node.type === IDENTIFIER) {
            resolvePath(exp.node, mod.env);
            exp.resolved = { module: mod, internalID: exp.node.value };
            return exp.resolved;
        }
        if (exp.isDefinition) {
            exp.resolved = { module: mod, internalID: exp.node.name };
            return exp.resolved;
        }

        var mod2 = resolveModulePath(mod.env, exp.node.children[0]);
        var exp2 = mod2.exports.get(exp.node.children[1].value);

        // BUG 620824: better error message
        if (visited.some(function(x) { return x.mod === mod2 && x.exp === exp2 }))
            throw new ReferenceError("cycle in module exports");

        exp.resolved = linkExport(mod2, exp2, visited);
        return exp.resolved;
    }