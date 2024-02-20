function resolveModule(node, env) {
    if (node.body) {
        let env2 = new StaticEnv(env, MODULE_FRAME);
        node.module.env = env2;
        resolveScript(node.body, env2);
    }
}