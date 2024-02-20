function resolveStatements(node, env) {
    let children = node.children;
    for (let i = 0; i < children.length; i++)
        resolveStatement(children[i], env);
}