function getAndCacheDiagnostics(sourceFile, cancellationToken, cache, getDiagnostics2) {
                var _a3;
                const cachedResult = sourceFile ? (_a3 = cache.perFile) == null ? void 0 : _a3.get(sourceFile.path) : cache.allDiagnostics;
                if (cachedResult) {
                    return cachedResult;
                }
                const result = getDiagnostics2(sourceFile, cancellationToken);
                if (sourceFile) {
                    (cache.perFile || (cache.perFile = /* @__PURE__ */ new Map())).set(sourceFile.path, result);
                }
                else {
                    cache.allDiagnostics = result;
                }
                return result;
            }