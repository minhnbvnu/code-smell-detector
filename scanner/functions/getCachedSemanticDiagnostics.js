function getCachedSemanticDiagnostics(sourceFile) {
                var _a3;
                return sourceFile ? (_a3 = cachedBindAndCheckDiagnosticsForFile.perFile) == null ? void 0 : _a3.get(sourceFile.path) : cachedBindAndCheckDiagnosticsForFile.allDiagnostics;
            }