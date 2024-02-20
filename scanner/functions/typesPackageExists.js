function typesPackageExists(packageName) {
                return getPackagesMap().has(getTypesPackageName(packageName));
            }