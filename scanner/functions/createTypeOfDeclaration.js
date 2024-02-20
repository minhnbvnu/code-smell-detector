function createTypeOfDeclaration(declarationIn, enclosingDeclaration, flags, tracker, addUndefined) {
                const declaration = getParseTreeNode(declarationIn, isVariableLikeOrAccessor);
                if (!declaration) {
                    return factory.createToken(131 /* AnyKeyword */);
                }
                const symbol = getSymbolOfDeclaration(declaration);
                let type = symbol && !(symbol.flags & (2048 /* TypeLiteral */ | 131072 /* Signature */)) ? getWidenedLiteralType(getTypeOfSymbol(symbol)) : errorType;
                if (type.flags & 8192 /* UniqueESSymbol */ && type.symbol === symbol) {
                    flags |= 1048576 /* AllowUniqueESSymbolType */;
                }
                if (addUndefined) {
                    type = getOptionalType(type);
                }
                return nodeBuilder.typeToTypeNode(type, enclosingDeclaration, flags | 1024 /* MultilineObjectLiterals */, tracker);
            }