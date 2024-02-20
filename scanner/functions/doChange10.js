function doChange10(changes, sourceFile, node, suggestedSymbol, target) {
            const suggestion = symbolName(suggestedSymbol);
            if (!isIdentifierText(suggestion, target) && isPropertyAccessExpression(node.parent)) {
                const valDecl = suggestedSymbol.valueDeclaration;
                if (valDecl && isNamedDeclaration(valDecl) && isPrivateIdentifier(valDecl.name)) {
                    changes.replaceNode(sourceFile, node, factory.createIdentifier(suggestion));
                }
                else {
                    changes.replaceNode(sourceFile, node.parent, factory.createElementAccessExpression(node.parent.expression, factory.createStringLiteral(suggestion)));
                }
            }
            else {
                changes.replaceNode(sourceFile, node, factory.createIdentifier(suggestion));
            }
        }