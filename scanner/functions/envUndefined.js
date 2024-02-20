function envUndefined(_parser, env) {
        throw new TexError_js_1.default('UnknownEnv', 'Unknown environment \'%1\'', env);
    }