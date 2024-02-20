function getQuickInfoAtPosition(fileName, position) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const node = getTouchingPropertyName(sourceFile, position);
                if (node === sourceFile) {
                    return void 0;
                }
                const typeChecker = program.getTypeChecker();
                const nodeForQuickInfo = getNodeForQuickInfo(node);
                const symbol = getSymbolAtLocationForQuickInfo(nodeForQuickInfo, typeChecker);
                if (!symbol || typeChecker.isUnknownSymbol(symbol)) {
                    const type = shouldGetType(sourceFile, nodeForQuickInfo, position) ? typeChecker.getTypeAtLocation(nodeForQuickInfo) : void 0;
                    return type && {
                        kind: "" /* unknown */,
                        kindModifiers: "" /* none */,
                        textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                        displayParts: typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => typeToDisplayParts(typeChecker2, type, getContainerNode(nodeForQuickInfo))),
                        documentation: type.symbol ? type.symbol.getDocumentationComment(typeChecker) : void 0,
                        tags: type.symbol ? type.symbol.getJsDocTags(typeChecker) : void 0
                    };
                }
                const { symbolKind, displayParts, documentation, tags } = typeChecker.runWithCancellationToken(cancellationToken, (typeChecker2) => ts_SymbolDisplay_exports.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker2, symbol, sourceFile, getContainerNode(nodeForQuickInfo), nodeForQuickInfo));
                return {
                    kind: symbolKind,
                    kindModifiers: ts_SymbolDisplay_exports.getSymbolModifiers(typeChecker, symbol),
                    textSpan: createTextSpanFromNode(nodeForQuickInfo, sourceFile),
                    displayParts,
                    documentation,
                    tags
                };
            }