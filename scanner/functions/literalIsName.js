function literalIsName(node) {
            return isDeclarationName(node) || node.parent.kind === 280 /* ExternalModuleReference */ || isArgumentOfElementAccessExpression(node) || isLiteralComputedPropertyDeclarationName(node);
        }