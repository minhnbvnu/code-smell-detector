function hashOfConfigFor(config) {
        if (!configHashCache.has(config)) {
            configHashCache.set(config, hash(`${pkg.version}_${nodeVersion}_${stringify(config)}`));
        }
        return configHashCache.get(config);
    }