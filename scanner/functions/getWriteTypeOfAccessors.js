function getWriteTypeOfAccessors(symbol) {
                var _a2;
                const links = getSymbolLinks(symbol);
                if (!links.writeType) {
                    if (!pushTypeResolution(symbol, 8 /* WriteType */)) {
                        return errorType;
                    }
                    const setter = (_a2 = getDeclarationOfKind(symbol, 175 /* SetAccessor */)) != null ? _a2 : tryCast(getDeclarationOfKind(symbol, 169 /* PropertyDeclaration */), isAutoAccessorPropertyDeclaration);
                    let writeType = getAnnotatedAccessorType(setter);
                    if (!popTypeResolution()) {
                        if (getAnnotatedAccessorTypeNode(setter)) {
                            error(setter, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation, symbolToString(symbol));
                        }
                        writeType = anyType;
                    }
                    links.writeType = writeType || getTypeOfAccessors(symbol);
                }
                return links.writeType;
            }