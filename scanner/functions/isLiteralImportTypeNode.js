function isLiteralImportTypeNode(n) {
            return isImportTypeNode(n) && isLiteralTypeNode(n.argument) && isStringLiteral(n.argument.literal);
        }