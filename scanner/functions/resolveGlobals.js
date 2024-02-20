function resolveGlobals(providedGlobals, enabledEnvironments) {
        return Object.assign({}, ...enabledEnvironments.filter(env => env.globals).map(env => env.globals), providedGlobals);
    }