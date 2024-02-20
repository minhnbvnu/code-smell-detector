function relativeToBuildInfo(path) {
                return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, state.program.getCanonicalFileName));
            }