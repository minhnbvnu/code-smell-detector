function accessPrivateIdentifier(env, name) {
            return walkUpLexicalEnvironments(env, (env2) => getPrivateIdentifier(env2.privateEnv, name));
        }