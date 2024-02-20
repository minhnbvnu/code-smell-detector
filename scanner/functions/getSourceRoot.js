function getSourceRoot(mapOptions) {
                const sourceRoot = normalizeSlashes(mapOptions.sourceRoot || "");
                return sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot;
            }