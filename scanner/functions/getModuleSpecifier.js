function getModuleSpecifier(compilerOptions, importingSourceFile, importingSourceFileName, toFileName2, host, options = {}) {
            return getModuleSpecifierWorker(compilerOptions, importingSourceFile, importingSourceFileName, toFileName2, host, getPreferences({}, compilerOptions, importingSourceFile), {}, options);
        }