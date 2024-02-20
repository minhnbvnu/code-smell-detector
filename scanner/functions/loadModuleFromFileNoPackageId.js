function loadModuleFromFileNoPackageId(extensions, candidate, onlyRecordFailures, state) {
            return noPackageId(loadModuleFromFile(extensions, candidate, onlyRecordFailures, state));
        }