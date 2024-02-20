function tryFile(fileName, onlyRecordFailures, state) {
            var _a2, _b;
            if (!((_a2 = state.compilerOptions.moduleSuffixes) == null ? void 0 : _a2.length)) {
                return tryFileLookup(fileName, onlyRecordFailures, state);
            }
            const ext = (_b = tryGetExtensionFromPath2(fileName)) != null ? _b : "";
            const fileNameNoExtension = ext ? removeExtension(fileName, ext) : fileName;
            return forEach(state.compilerOptions.moduleSuffixes, (suffix) => tryFileLookup(fileNameNoExtension + suffix + ext, onlyRecordFailures, state));
        }