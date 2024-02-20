function tryGetModuleNameFromDeclaration(declaration, host, factory2, resolver, compilerOptions) {
            return tryGetModuleNameFromFile(factory2, resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
        }