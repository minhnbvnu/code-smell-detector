function ensureAbsolutePath(p, tsconfigRootDir) {
        return path_1.default.isAbsolute(p)
            ? p
            : path_1.default.join(tsconfigRootDir || process.cwd(), p);
    }