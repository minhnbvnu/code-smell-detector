function widenTypeForVariableLikeDeclaration(type, declaration, reportErrors2) {
                if (type) {
                    if (type.flags & 4096 /* ESSymbol */ && isGlobalSymbolConstructor(declaration.parent)) {
                        type = getESSymbolLikeTypeForNode(declaration);
                    }
                    if (reportErrors2) {
                        reportErrorsFromWidening(declaration, type);
                    }
                    if (type.flags & 8192 /* UniqueESSymbol */ && (isBindingElement(declaration) || !declaration.type) && type.symbol !== getSymbolOfDeclaration(declaration)) {
                        type = esSymbolType;
                    }
                    return getWidenedType(type);
                }
                type = isParameter(declaration) && declaration.dotDotDotToken ? anyArrayType : anyType;
                if (reportErrors2) {
                    if (!declarationBelongsToPrivateAmbientMember(declaration)) {
                        reportImplicitAny(declaration, type);
                    }
                }
                return type;
            }