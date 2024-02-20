function handleDtsMayChangeOfGlobalScope(state, filePath, cancellationToken, host) {
            var _a2;
            if (!((_a2 = state.fileInfos.get(filePath)) == null ? void 0 : _a2.affectsGlobalScope))
                return false;
            BuilderState.getAllFilesExcludingDefaultLibraryFile(state, state.program, 
            /*firstSourceFile*/
            void 0).forEach((file) => handleDtsMayChangeOf(state, file.resolvedPath, cancellationToken, host));
            removeDiagnosticsOfLibraryFiles(state);
            return true;
        }