function getTypesPackageName(packageName) {
            return `@types/${mangleScopedPackageName(packageName)}`;
        }