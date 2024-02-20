function transpile(file, source, target, transformers) {
        const { outputText: output, diagnostics } = typescript_1.default.transpileModule(source, {
            fileName: file,
            reportDiagnostics: true,
            compilerOptions: {
                target,
                module: typescript_1.default.ModuleKind.CommonJS,
                esModuleInterop: true,
                importHelpers: true,
                downlevelIteration: true,
            },
            transformers,
        });
        if (diagnostics == null || diagnostics.length == 0)
            return { output };
        else {
            const { text } = (0, compiler_1.report_diagnostics)(diagnostics);
            return { output, error: text };
        }
    }