function getOptionsDiagnosticsOfConfigFile() {
                if (!options.configFile)
                    return emptyArray;
                let diagnostics = programDiagnostics.getDiagnostics(options.configFile.fileName);
                forEachResolvedProjectReference2((resolvedRef) => {
                    diagnostics = concatenate(diagnostics, programDiagnostics.getDiagnostics(resolvedRef.sourceFile.fileName));
                });
                return diagnostics;
            }