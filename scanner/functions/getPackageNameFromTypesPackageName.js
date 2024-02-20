function getPackageNameFromTypesPackageName(mangledName) {
            const withoutAtTypePrefix = removePrefix(mangledName, "@types/");
            if (withoutAtTypePrefix !== mangledName) {
                return unmangleScopedPackageName(withoutAtTypePrefix);
            }
            return mangledName;
        }