function parse_tsconfig(tsconfig_json, base_dir, preconfigure) {
        const host = {
            useCaseSensitiveFileNames: typescript_1.default.sys.useCaseSensitiveFileNames,
            readDirectory: typescript_1.default.sys.readDirectory,
            fileExists: typescript_1.default.sys.fileExists,
            readFile: typescript_1.default.sys.readFile,
        };
        const tsconfig = typescript_1.default.parseJsonConfigFileContent(tsconfig_json, host, base_dir, preconfigure);
        if (tsconfig.errors.length != 0) {
            return { diagnostics: tsconfig.errors };
        }
        return { files: tsconfig.fileNames, options: tsconfig.options };
    }