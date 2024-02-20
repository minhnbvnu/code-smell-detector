function handleDtsMayChangeOfFileAndExportsOfFile(state, filePath, seenFileAndExportsOfFile, cancellationToken, host) {
            var _a2, _b;
            if (!tryAddToSet(seenFileAndExportsOfFile, filePath))
                return void 0;
            if (handleDtsMayChangeOfGlobalScope(state, filePath, cancellationToken, host))
                return true;
            handleDtsMayChangeOf(state, filePath, cancellationToken, host);
            (_a2 = state.exportedModulesMap.getKeys(filePath)) == null ? void 0 : _a2.forEach((exportedFromPath) => handleDtsMayChangeOfFileAndExportsOfFile(state, exportedFromPath, seenFileAndExportsOfFile, cancellationToken, host));
            (_b = state.referencedMap.getKeys(filePath)) == null ? void 0 : _b.forEach((referencingFilePath) => !seenFileAndExportsOfFile.has(referencingFilePath) && // Not already removed diagnostic file
                handleDtsMayChangeOf(
                // Dont add to seen since this is not yet done with the export removal
                state, referencingFilePath, cancellationToken, host));
            return void 0;
        }