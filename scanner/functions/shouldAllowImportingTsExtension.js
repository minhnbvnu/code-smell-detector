function shouldAllowImportingTsExtension(compilerOptions, fromFileName) {
            return !!compilerOptions.allowImportingTsExtensions || fromFileName && isDeclarationFileName(fromFileName);
        }