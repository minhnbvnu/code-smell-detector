function getExternalModuleNameLiteral(factory2, importNode, sourceFile, host, resolver, compilerOptions) {
            const moduleName = getExternalModuleName(importNode);
            if (moduleName && isStringLiteral(moduleName)) {
                return tryGetModuleNameFromDeclaration(importNode, host, factory2, resolver, compilerOptions) || tryRenameExternalModule(factory2, moduleName, sourceFile) || factory2.cloneNode(moduleName);
            }
            return void 0;
        }