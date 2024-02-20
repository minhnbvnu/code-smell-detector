function isInsideNodeModules(fileOrDirectory) {
            return contains(getPathComponents(fileOrDirectory), "node_modules");
        }