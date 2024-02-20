function isSupportedSourceFileName(fileName, compilerOptions, extraFileExtensions) {
            if (!fileName)
                return false;
            const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
            for (const extension of flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions))) {
                if (fileExtensionIs(fileName, extension)) {
                    return true;
                }
            }
            return false;
        }