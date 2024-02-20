function createMarkerType(symbol, source, target) {
                const mapper = makeUnaryTypeMapper(source, target);
                const type = getDeclaredTypeOfSymbol(symbol);
                if (isErrorType(type)) {
                    return type;
                }
                const result = symbol.flags & 524288 /* TypeAlias */ ? getTypeAliasInstantiation(symbol, instantiateTypes(getSymbolLinks(symbol).typeParameters, mapper)) : createTypeReference(type, instantiateTypes(type.typeParameters, mapper));
                markerTypes.add(getTypeId(result));
                return result;
            }