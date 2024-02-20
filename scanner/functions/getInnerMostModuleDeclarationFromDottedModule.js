function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration) {
                if (moduleDeclaration.body.kind === 264 /* ModuleDeclaration */) {
                    const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration.body);
                    return recursiveInnerModule || moduleDeclaration.body;
                }
            }