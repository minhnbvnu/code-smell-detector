function walkUpLexicalEnvironments(env, cb) {
            while (env) {
                const result = cb(env);
                if (result !== void 0)
                    return result;
                env = env.previous;
            }
        }