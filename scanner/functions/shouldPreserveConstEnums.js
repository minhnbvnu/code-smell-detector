function shouldPreserveConstEnums(compilerOptions) {
            return !!(compilerOptions.preserveConstEnums || getIsolatedModules(compilerOptions));
        }