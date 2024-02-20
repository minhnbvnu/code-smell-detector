function isLiteralComputedPropertyDeclarationName(node) {
            return isStringOrNumericLiteralLike(node) && node.parent.kind === 164 /* ComputedPropertyName */ && isDeclaration(node.parent.parent);
        }