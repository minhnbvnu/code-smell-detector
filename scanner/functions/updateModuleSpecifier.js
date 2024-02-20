function updateModuleSpecifier(compilerOptions, importingSourceFile, importingSourceFileName, toFileName2, host, oldImportSpecifier, options = {}) {
            const res = getModuleSpecifierWorker(compilerOptions, importingSourceFile, importingSourceFileName, toFileName2, host, getPreferences({}, compilerOptions, importingSourceFile, oldImportSpecifier), {}, options);
            if (res === oldImportSpecifier)
                return void 0;
            return res;
        }