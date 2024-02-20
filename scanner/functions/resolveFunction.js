function resolveFunction(node, env) {
    let env2 = new StaticEnv(env, FUNCTION_FRAME);
    if (node.name && node.functionForm === parser.EXPRESSED_FORM)
        env2.bind(node.name, new Def(FUN_DEF, node));

    // BUG 620819: handle destructuring
    for (let i = 0; i < node.params.length; i++)
        env2.bind(node.params[i], new Def(ARG_DEF));

    resolveScript(node.body, env2);
}