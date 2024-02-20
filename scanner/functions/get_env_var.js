function get_env_var(keys, try_lower) {
        var val, i = -1, env = process.env;
        while (!val && i < keys.length - 1) {
            val = env[keys[++i]];
            if (!val && try_lower) {
                val = env[keys[i].toLowerCase()];
            }
        }
        return val;
    }