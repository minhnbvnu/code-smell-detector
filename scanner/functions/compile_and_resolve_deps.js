async function compile_and_resolve_deps(input) {
        const { file, lang, bokehjs_dir } = input;
        const { code } = input;
        let output;
        switch (lang) {
            case "typescript":
                const inputs = new Map([[normalize(file), code]]);
                const { outputs, diagnostics } = compile_typescript(".", inputs, bokehjs_dir);
                if (diagnostics != null && diagnostics.length != 0) {
                    const failure = (0, compiler_1.report_diagnostics)(diagnostics);
                    return { error: failure.text };
                }
                else {
                    const js_file = normalize((0, sys_1.rename)(file, { ext: ".js" }));
                    output = outputs.get(js_file);
                }
                break;
            case "javascript": {
                const result = compile_javascript(".", file, code);
                if (result.diagnostics != null && result.diagnostics.length != 0) {
                    const failure = (0, compiler_1.report_diagnostics)(result.diagnostics);
                    return { error: failure.text };
                }
                else {
                    output = result.output;
                }
                break;
            }
            case "less":
                try {
                    const { css } = await less_1.default.render(code, { filename: file, compress: true });
                    return { code: css };
                }
                catch (error) {
                    return { error: `${error}` };
                }
            default:
                throw new Error(`unsupported input type: ${lang}`);
        }
        const source = typescript_1.default.createSourceFile(file, output, typescript_1.default.ScriptTarget.ES2015, true, typescript_1.default.ScriptKind.JS);
        const deps = transforms.collect_deps(source);
        return { code: output, deps };
    }