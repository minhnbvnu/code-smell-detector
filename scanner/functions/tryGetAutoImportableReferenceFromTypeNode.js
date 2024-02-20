function tryGetAutoImportableReferenceFromTypeNode(importTypeNode, scriptTarget) {
            let symbols;
            const typeNode = visitNode(importTypeNode, visit, isTypeNode);
            if (symbols && typeNode) {
                return { typeNode, symbols };
            }
            function visit(node) {
                if (isLiteralImportTypeNode(node) && node.qualifier) {
                    const firstIdentifier = getFirstIdentifier(node.qualifier);
                    const name = getNameForExportedSymbol(firstIdentifier.symbol, scriptTarget);
                    const qualifier = name !== firstIdentifier.text ? replaceFirstIdentifierOfEntityName(node.qualifier, factory.createIdentifier(name)) : node.qualifier;
                    symbols = append(symbols, firstIdentifier.symbol);
                    const typeArguments = visitNodes2(node.typeArguments, visit, isTypeNode);
                    return factory.createTypeReferenceNode(qualifier, typeArguments);
                }
                return visitEachChild(node, visit, nullTransformationContext);
            }
        }