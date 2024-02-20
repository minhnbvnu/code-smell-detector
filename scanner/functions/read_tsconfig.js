function read_tsconfig(tsconfig_path, preconfigure) {
        const tsconfig_file = typescript_1.default.readConfigFile(tsconfig_path, typescript_1.default.sys.readFile);
        if (tsconfig_file.error != null) {
            return { diagnostics: [tsconfig_file.error] };
        }
        return parse_tsconfig(tsconfig_file.config, (0, path_1.dirname)(tsconfig_path), preconfigure);
    }