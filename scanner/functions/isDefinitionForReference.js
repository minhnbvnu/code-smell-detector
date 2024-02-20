function isDefinitionForReference(node) {
            return node.kind === 88 /* DefaultKeyword */ || !!getDeclarationFromName(node) || isLiteralComputedPropertyDeclarationName(node) || node.kind === 135 /* ConstructorKeyword */ && isConstructorDeclaration(node.parent);
        }