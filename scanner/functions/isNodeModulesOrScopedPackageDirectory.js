function isNodeModulesOrScopedPackageDirectory(s, getCanonicalFileName) {
            return s !== void 0 && (getCanonicalFileName(s) === "node_modules" || startsWith(s, "@"));
        }