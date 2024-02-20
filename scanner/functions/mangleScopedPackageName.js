function mangleScopedPackageName(packageName) {
            if (startsWith(packageName, "@")) {
                const replaceSlash = packageName.replace(directorySeparator, mangledScopedPackageSeparator);
                if (replaceSlash !== packageName) {
                    return replaceSlash.slice(1);
                }
            }
            return packageName;
        }