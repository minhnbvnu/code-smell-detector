function register_models(models, force = false) {
        for (const model of (0, types_1.isArray)(models) ? models : (0, object_1.values)(models)) {
            if (is_HasProps(model)) {
                exports.default_resolver.register(model, force);
            }
        }
    }