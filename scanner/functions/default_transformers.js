function default_transformers(options) {
        const transformers = {
            before: [],
            after: [],
            afterDeclarations: [],
        };
        const insert_class_name = transforms.insert_class_name();
        transformers.before.push(insert_class_name);
        const base = options.baseUrl;
        if (base != null) {
            const relativize_modules = transforms.relativize_modules((file, module_path) => {
                if (!module_path.startsWith(".") && !module_path.startsWith("/")) {
                    const module_file = (0, path_1.join)(base, module_path);
                    if (typescript_1.default.sys.fileExists(module_file) ||
                        typescript_1.default.sys.fileExists(`${module_file}.ts`) ||
                        typescript_1.default.sys.fileExists((0, path_1.join)(module_file, "index.ts")) ||
                        options.outDir != null && typescript_1.default.sys.fileExists((0, path_1.join)(options.outDir, `${module_path}.js`))) {
                        const rel_path = normalize((0, path_1.relative)((0, path_1.dirname)(file), module_file));
                        return rel_path.startsWith(".") ? rel_path : `./${rel_path}`;
                    }
                }
                return null;
            });
            transformers.after.push(relativize_modules);
            transformers.afterDeclarations.push(relativize_modules);
        }
        return transformers;
    }