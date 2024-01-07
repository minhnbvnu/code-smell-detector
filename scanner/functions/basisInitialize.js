function basisInitialize(config) {
    if (initializing) {
        // already initializing
        return;
    }

    if (!config) {
        config = lazyConfig || {};
    } else if (config.lazyInit) {
        lazyConfig = config;
        return;
    }

    // if any URLs are not specified in the config, take them from WasmModule config
    if (!config.glueUrl || !config.wasmUrl || !config.fallbackUrl) {
        const moduleConfig = WasmModule.getConfig('BASIS');
        if (moduleConfig) {
            config = {
                glueUrl: moduleConfig.glueUrl,
                wasmUrl: moduleConfig.wasmUrl,
                fallbackUrl: moduleConfig.fallbackUrl,
                numWorkers: moduleConfig.numWorkers
            };
        }
    }

    if (config.glueUrl || config.wasmUrl || config.fallbackUrl) {
        initializing = true;

        const numWorkers = Math.max(1, Math.min(16, config.numWorkers || defaultNumWorkers));
        const eagerWorkers = (config.numWorkers === 1) || (config.hasOwnProperty('eagerWorkers') ? config.eagerWorkers : true);

        config.rgbPriority = config.rgbPriority || defaultRgbPriority;
        config.rgbaPriority = config.rgbaPriority || defaultRgbaPriority;
        config.maxRetries = config.hasOwnProperty('maxRetries') ? config.maxRetries : defaultMaxRetries;

        prepareWorkerModules(config, (err, clientConfig) => {
            if (err) {
                console.error(`failed to initialize basis worker: ${err}`);
            } else {
                for (let i = 0; i < numWorkers; ++i) {
                    queue.enqueueClient(new BasisClient(queue, clientConfig, eagerWorkers));
                }
            }
        });
    }
}