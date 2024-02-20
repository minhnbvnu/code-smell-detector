function updateTypeRootsWatch() {
                const options = resolutionHost.getCompilationSettings();
                if (options.types) {
                    closeTypeRootsWatch();
                    return;
                }
                const typeRoots = getEffectiveTypeRoots(options, { directoryExists: directoryExistsForTypeRootWatch, getCurrentDirectory });
                if (typeRoots) {
                    mutateMap(typeRootsWatches, arrayToMap(typeRoots, (tr) => resolutionHost.toPath(tr)), {
                        createNewValue: createTypeRootsWatch,
                        onDeleteValue: closeFileWatcher
                    });
                }
                else {
                    closeTypeRootsWatch();
                }
            }