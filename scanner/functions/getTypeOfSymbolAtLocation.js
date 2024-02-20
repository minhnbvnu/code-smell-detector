function getTypeOfSymbolAtLocation(symbol, location) {
                symbol = getExportSymbolOfValueSymbolIfExported(symbol);
                if (location.kind === 79 /* Identifier */ || location.kind === 80 /* PrivateIdentifier */) {
                    if (isRightSideOfQualifiedNameOrPropertyAccess(location)) {
                        location = location.parent;
                    }
                    if (isExpressionNode(location) && (!isAssignmentTarget(location) || isWriteAccess(location))) {
                        const type = getTypeOfExpression(location);
                        if (getExportSymbolOfValueSymbolIfExported(getNodeLinks(location).resolvedSymbol) === symbol) {
                            return type;
                        }
                    }
                }
                if (isDeclarationName(location) && isSetAccessor(location.parent) && getAnnotatedAccessorTypeNode(location.parent)) {
                    return getWriteTypeOfAccessors(location.parent.symbol);
                }
                return getNonMissingTypeOfSymbol(symbol);
            }