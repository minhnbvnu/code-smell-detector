function resolveVariables(node, env) {
    // BUG 620819: handle destructuring
    let children = node.children;

    for (let i = 0; i < children.length; i++) {
        let name = children[i].name;
        if (env.hoistBarrier(name))
            throw new Error("illegal redeclaration of local variable " + name);
        let init = children[i].initializer;
        if (init)
            resolveExpression(init, env);
    }
}