function isNonGlobalAmbientModule(node) {
            return isModuleDeclaration(node) && isStringLiteral(node.name);
        }