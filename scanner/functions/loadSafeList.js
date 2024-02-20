function loadSafeList(host, safeListPath) {
            const result = readConfigFile(safeListPath, (path) => host.readFile(path));
            return new Map(Object.entries(result.config));
        }