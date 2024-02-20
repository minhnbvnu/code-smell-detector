function isModuleSpecifierLike(node) {
            return isStringLiteralLike(node) && (isExternalModuleReference(node.parent) || isImportDeclaration(node.parent) || isRequireCall(node.parent, 
            /*requireStringLiteralLikeArgument*/
            false) && node.parent.arguments[0] === node || isImportCall(node.parent) && node.parent.arguments[0] === node);
        }