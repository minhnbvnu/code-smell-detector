function getFullyQualifiedModuleName(moduleDeclaration) {
            const result = [getTextOfIdentifierOrLiteral(moduleDeclaration.name)];
            while (moduleDeclaration.body && moduleDeclaration.body.kind === 264 /* ModuleDeclaration */) {
                moduleDeclaration = moduleDeclaration.body;
                result.push(getTextOfIdentifierOrLiteral(moduleDeclaration.name));
            }
            return result.join(".");
        }