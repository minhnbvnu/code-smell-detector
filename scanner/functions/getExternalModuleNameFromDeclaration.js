function getExternalModuleNameFromDeclaration(host, resolver, declaration) {
            const file = resolver.getExternalModuleFileFromDeclaration(declaration);
            if (!file || file.isDeclarationFile) {
                return void 0;
            }
            const specifier = getExternalModuleName(declaration);
            if (specifier && isStringLiteralLike(specifier) && !pathIsRelative(specifier.text) && getCanonicalAbsolutePath(host, file.path).indexOf(getCanonicalAbsolutePath(host, ensureTrailingDirectorySeparator(host.getCommonSourceDirectory()))) === -1) {
                return void 0;
            }
            return getResolvedExternalModuleName(host, file);
        }