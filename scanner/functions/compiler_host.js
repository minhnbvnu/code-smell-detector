function compiler_host(inputs, options, tslib_dir) {
        const default_host = typescript_1.default.createIncrementalCompilerHost(options);
        const host = {
            ...default_host,
            fileExists(name) {
                return inputs.get(name) != null || default_host.fileExists(name);
            },
            readFile(name) {
                return inputs.get(name) != null ? inputs.get(name) : default_host.readFile(name);
            },
            getSourceFile(name, target, _onError) {
                const source = inputs.get(name);
                if (source != null) {
                    const sf = typescript_1.default.createSourceFile(name, source, target);
                    const version = default_host.createHash(source);
                    return { ...sf, version }; // version is internal to the compiler
                }
                else
                    return default_host.getSourceFile(name, target, _onError);
            },
        };
        if (tslib_dir != null) {
            host.getDefaultLibLocation = () => tslib_dir;
        }
        return host;
    }