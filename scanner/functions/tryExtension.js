function tryExtension(ext, resolvedUsingTsExtension) {
                const path = tryFile(candidate + ext, onlyRecordFailures, state);
                return path === void 0 ? void 0 : { path, ext, resolvedUsingTsExtension: !state.candidateIsFromPackageJsonField && resolvedUsingTsExtension };
            }