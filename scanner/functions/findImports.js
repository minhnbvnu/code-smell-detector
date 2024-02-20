function findImports(sourceFile, kinds, ignoreFileName = true) {
        const result = [];
        for (const node of findImportLikeNodes(sourceFile, kinds, ignoreFileName)) {
            switch (node.kind) {
                case ts.SyntaxKind.ImportDeclaration:
                    addIfTextualLiteral(node.moduleSpecifier);
                    break;
                case ts.SyntaxKind.ImportEqualsDeclaration:
                    addIfTextualLiteral(node.moduleReference.expression);
                    break;
                case ts.SyntaxKind.ExportDeclaration:
                    addIfTextualLiteral(node.moduleSpecifier);
                    break;
                case ts.SyntaxKind.CallExpression:
                    addIfTextualLiteral(node.arguments[0]);
                    break;
                case ts.SyntaxKind.ImportType:
                    if (node_1.isLiteralTypeNode(node.argument))
                        addIfTextualLiteral(node.argument.literal);
                    break;
                default:
                    throw new Error('unexpected node');
            }
        }
        return result;
        function addIfTextualLiteral(node) {
            if (node_1.isTextualLiteral(node))
                result.push(node);
        }
    }