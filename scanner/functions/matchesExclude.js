function matchesExclude(pathToCheck, excludeSpecs, useCaseSensitiveFileNames, currentDirectory) {
            return matchesExcludeWorker(pathToCheck, filter(excludeSpecs, (spec) => !invalidDotDotAfterRecursiveWildcard(spec)), useCaseSensitiveFileNames, currentDirectory);
        }