function reportWatchDiagnostic(message) {
                if (host.onWatchStatusChange) {
                    host.onWatchStatusChange(createCompilerDiagnostic(message), newLine, compilerOptions || optionsToExtendForConfigFile);
                }
            }