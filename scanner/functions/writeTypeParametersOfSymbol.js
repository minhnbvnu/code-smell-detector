function writeTypeParametersOfSymbol(symbol2, enclosingDeclaration2) {
                const typeParameterParts = mapToDisplayParts((writer) => {
                    const params = typeChecker.symbolToTypeParameterDeclarations(symbol2, enclosingDeclaration2, symbolDisplayNodeBuilderFlags);
                    getPrinter().writeList(53776 /* TypeParameters */, params, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration2)), writer);
                });
                addRange(displayParts, typeParameterParts);
            }