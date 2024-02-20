function addResolutionDiagnostics(resolution) {
                var _a3;
                if (!((_a3 = resolution.resolutionDiagnostics) == null ? void 0 : _a3.length))
                    return;
                (fileProcessingDiagnostics != null ? fileProcessingDiagnostics : fileProcessingDiagnostics = []).push({
                    kind: 2 /* ResolutionDiagnostics */,
                    diagnostics: resolution.resolutionDiagnostics
                });
            }