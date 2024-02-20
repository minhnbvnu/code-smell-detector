function emitDeprecationWarning(source, errorCode) {
        const cacheKey = JSON.stringify({ source, errorCode });
        if (sourceFileErrorCache.has(cacheKey)) {
            return;
        }
        sourceFileErrorCache.add(cacheKey);
        const rel = path.relative(process.cwd(), source);
        const message = deprecationWarningMessages[errorCode];
        process.emitWarning(`${message} (found in "${rel}")`, "DeprecationWarning", errorCode);
    }