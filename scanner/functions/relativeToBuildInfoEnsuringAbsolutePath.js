function relativeToBuildInfoEnsuringAbsolutePath(path) {
                return relativeToBuildInfo(getNormalizedAbsolutePath(path, currentDirectory));
            }