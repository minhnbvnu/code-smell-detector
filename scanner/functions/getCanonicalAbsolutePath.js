function getCanonicalAbsolutePath(host, path) {
            return host.getCanonicalFileName(getNormalizedAbsolutePath(path, host.getCurrentDirectory()));
        }