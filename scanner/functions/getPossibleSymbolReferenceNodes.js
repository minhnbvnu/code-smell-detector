function getPossibleSymbolReferenceNodes(sourceFile, symbolName2, container = sourceFile) {
                        return getPossibleSymbolReferencePositions(sourceFile, symbolName2, container).map((pos) => getTouchingPropertyName(sourceFile, pos));
                    }