function guessDirectorySymlink(a, b, cwd, getCanonicalFileName) {
            const aParts = getPathComponents(getNormalizedAbsolutePath(a, cwd));
            const bParts = getPathComponents(getNormalizedAbsolutePath(b, cwd));
            let isDirectory = false;
            while (aParts.length >= 2 && bParts.length >= 2 && !isNodeModulesOrScopedPackageDirectory(aParts[aParts.length - 2], getCanonicalFileName) && !isNodeModulesOrScopedPackageDirectory(bParts[bParts.length - 2], getCanonicalFileName) && getCanonicalFileName(aParts[aParts.length - 1]) === getCanonicalFileName(bParts[bParts.length - 1])) {
                aParts.pop();
                bParts.pop();
                isDirectory = true;
            }
            return isDirectory ? [getPathFromPathComponents(aParts), getPathFromPathComponents(bParts)] : void 0;
        }