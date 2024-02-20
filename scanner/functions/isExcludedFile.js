function isExcludedFile(pathToCheck, spec, basePath, useCaseSensitiveFileNames, currentDirectory) {
            const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = spec;
            if (!length(validatedIncludeSpecs) || !length(validatedExcludeSpecs))
                return false;
            basePath = normalizePath(basePath);
            const keyMapper = createGetCanonicalFileName(useCaseSensitiveFileNames);
            if (validatedFilesSpec) {
                for (const fileName of validatedFilesSpec) {
                    if (keyMapper(getNormalizedAbsolutePath(fileName, basePath)) === pathToCheck)
                        return false;
                }
            }
            return matchesExcludeWorker(pathToCheck, validatedExcludeSpecs, useCaseSensitiveFileNames, currentDirectory, basePath);
        }