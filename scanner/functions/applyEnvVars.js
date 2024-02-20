function applyEnvVars(argv, configOnly) {
                if (typeof envPrefix === 'undefined')
                    return;
                const prefix = typeof envPrefix === 'string' ? envPrefix : '';
                const env = mixin.env();
                Object.keys(env).forEach(function (envVar) {
                    if (prefix === '' || envVar.lastIndexOf(prefix, 0) === 0) {
                        const keys = envVar.split('__').map(function (key, i) {
                            if (i === 0) {
                                key = key.substring(prefix.length);
                            }
                            return camelCase(key);
                        });
                        if (((configOnly && flags.configs[keys.join('.')]) || !configOnly) && !hasKey(argv, keys)) {
                            setArg(keys.join('.'), env[envVar]);
                        }
                    }
                });
            }