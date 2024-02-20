function compile_javascript(base_dir, file, code) {
        const tsconfig = parse_patched_tsconfig(base_dir, {});
        if (tsconfig.diagnostics != null)
            return { diagnostics: tsconfig.diagnostics };
        const { outputText, diagnostics } = typescript_1.default.transpileModule(code, {
            fileName: file,
            reportDiagnostics: true,
            compilerOptions: {
                target: tsconfig.options.target,
                module: typescript_1.default.ModuleKind.CommonJS,
            },
        });
        return { output: outputText, diagnostics };
    }