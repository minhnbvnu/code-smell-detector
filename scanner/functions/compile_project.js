function compile_project(tsconfig_path, config) {
        const tsconfig = read_tsconfig(tsconfig_path);
        if (is_failed(tsconfig))
            return { diagnostics: tsconfig.diagnostics };
        const { files, options } = tsconfig;
        const transformers = default_transformers(tsconfig.options);
        const inputs = config.inputs?.(files) ?? new Map();
        const host = compiler_host(inputs, options, config.tslib_dir);
        const input_files = [...inputs.keys(), ...files];
        return compile_files(input_files, options, transformers, host);
    }