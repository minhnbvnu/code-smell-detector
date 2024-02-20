function loadModuleFromFile(extensions, candidate, onlyRecordFailures, state) {
            const resolvedByReplacingExtension = loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state);
            if (resolvedByReplacingExtension) {
                return resolvedByReplacingExtension;
            }
            if (!(state.features & 32 /* EsmMode */)) {
                const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, "", onlyRecordFailures, state);
                if (resolvedByAddingExtension) {
                    return resolvedByAddingExtension;
                }
            }
        }