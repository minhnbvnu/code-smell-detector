function safelyShadowsUndefined(variable) {
        return variable.name === "undefined" &&
            variable.references.every(ref => !ref.isWrite()) &&
            variable.defs.every(def => def.node.type === "VariableDeclarator" && def.node.init === null);
    }