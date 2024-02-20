function unmangleScopedPackageName(typesPackageName) {
            return stringContains(typesPackageName, mangledScopedPackageSeparator) ? "@" + typesPackageName.replace(mangledScopedPackageSeparator, directorySeparator) : typesPackageName;
        }