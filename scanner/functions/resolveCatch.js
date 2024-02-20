function resolveCatch(node, env) {
    let env2 = new StaticEnv(env, CATCH_FRAME);

    // BUG 620819: handle destructuring
    env2.bind(node.varName, new Def(CATCH_DEF, node));
    if (node.guard)
        resolveExpression(node.guard, env2);
    resolveStatement(node.block, env2);
}