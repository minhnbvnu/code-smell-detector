function clearScreenIfNotWatchingForFileChanges(system, diagnostic, options) {
            if (system.clearScreen && !options.preserveWatchOutput && !options.extendedDiagnostics && !options.diagnostics && contains(screenStartingMessageCodes, diagnostic.code)) {
                system.clearScreen();
                return true;
            }
            return false;
        }