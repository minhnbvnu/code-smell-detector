function validateEnvironment(environment, source, getAdditionalEnv = noop) {
        // not having an environment is ok
        if (!environment) {
            return;
        }
        Object.keys(environment).forEach(id => {
            const env = getAdditionalEnv(id) || BuiltInEnvironments.get(id) || null;
            if (!env) {
                const message = `${source}:\n\tEnvironment key "${id}" is unknown\n`;
                throw new Error(message);
            }
        });
    }