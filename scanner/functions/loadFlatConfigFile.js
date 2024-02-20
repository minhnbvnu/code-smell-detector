async function loadFlatConfigFile(filePath) {
        debug(`Loading config from ${filePath}`);
        const fileURL = pathToFileURL(filePath);
        debug(`Config file URL is ${fileURL}`);
        const mtime = (await fs.stat(filePath)).mtime.getTime();
        /*
         * Append a query with the config file's modification time (`mtime`) in order
         * to import the current version of the config file. Without the query, `import()` would
         * cache the config file module by the pathname only, and then always return
         * the same version (the one that was actual when the module was imported for the first time).
         *
         * This ensures that the config file module is loaded and executed again
         * if it has been changed since the last time it was imported.
         * If it hasn't been changed, `import()` will just return the cached version.
         *
         * Note that we should not overuse queries (e.g., by appending the current time
         * to always reload the config file module) as that could cause memory leaks
         * because entries are never removed from the import cache.
         */
        fileURL.searchParams.append("mtime", mtime);
        /*
         * With queries, we can bypass the import cache. However, when import-ing a CJS module,
         * Node.js uses the require infrastructure under the hood. That includes the require cache,
         * which caches the config file module by its file path (queries have no effect).
         * Therefore, we also need to clear the require cache before importing the config file module.
         * In order to get the same behavior with ESM and CJS config files, in particular - to reload
         * the config file only if it has been changed, we track file modification times and clear
         * the require cache only if the file has been changed.
         */
        if (importedConfigFileModificationTime.get(filePath) !== mtime) {
            delete require.cache[filePath];
        }
        const config = (await import(fileURL)).default;
        importedConfigFileModificationTime.set(filePath, mtime);
        return config;
    }