function getDefinitionKindAndDisplayParts(symbol, checker, node) {
            const meaning = Core.getIntersectingMeaningFromDeclarations(node, symbol);
            const enclosingDeclaration = symbol.declarations && firstOrUndefined(symbol.declarations) || node;
            const { displayParts, symbolKind } = ts_SymbolDisplay_exports.getSymbolDisplayPartsDocumentationAndSymbolKind(checker, symbol, enclosingDeclaration.getSourceFile(), enclosingDeclaration, enclosingDeclaration, meaning);
            return { displayParts, kind: symbolKind };
        }