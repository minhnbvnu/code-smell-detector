function compile_typescript(base_dir, inputs, bokehjs_dir) {
        const is_static_dir = (0, path_1.basename)(bokehjs_dir) == "static";
        const preconfigure = {
            module: typescript_1.default.ModuleKind.CommonJS,
            target: typescript_1.default.ScriptTarget.ES2017,
            paths: {
                "*": [
                    (0, path_1.join)(bokehjs_dir, "js/lib/*"),
                ],
            },
            outDir: undefined,
        };
        const tsconfig = parse_patched_tsconfig(base_dir, preconfigure);
        if (tsconfig.diagnostics != null)
            return { diagnostics: tsconfig.diagnostics };
        const tslib_dir = (() => {
            // bokeh/server/static or bokehjs/build
            if (is_static_dir)
                return (0, path_1.join)(bokehjs_dir, "lib");
            else
                return (0, path_1.join)((0, path_1.dirname)(bokehjs_dir), "node_modules", "typescript", "lib");
        })();
        const host = (0, compiler_1.compiler_host)(inputs, tsconfig.options, tslib_dir);
        const transformers = (0, compiler_1.default_transformers)(tsconfig.options);
        const outputs = new Map();
        host.writeFile = (name, data) => {
            outputs.set(name, data);
        };
        const files = [...inputs.keys()];
        return { outputs, ...(0, compiler_1.compile_files)(files, tsconfig.options, transformers, host) };
    }