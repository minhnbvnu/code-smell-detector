async function lint(config_file, paths) {
        const eslint = new eslint_1.ESLint({
            extensions: [".ts", ".js"],
            overrideConfigFile: config_file,
        });
        const results = await eslint.lintFiles(paths);
        const errors = results.some(result => result.errorCount != 0);
        const warnings = results.some(result => result.warningCount != 0);
        if (errors || warnings) {
            const formatter = await eslint.loadFormatter("stylish");
            const output = await formatter.format(results);
            for (const line of output.trim().split("\n"))
                print(line);
        }
        return !errors;
    }