function createEmptyObjectTypeFromStringLiteral(type) {
                const members = createSymbolTable();
                forEachType(type, (t) => {
                    if (!(t.flags & 128 /* StringLiteral */)) {
                        return;
                    }
                    const name = escapeLeadingUnderscores(t.value);
                    const literalProp = createSymbol(4 /* Property */, name);
                    literalProp.links.type = anyType;
                    if (t.symbol) {
                        literalProp.declarations = t.symbol.declarations;
                        literalProp.valueDeclaration = t.symbol.valueDeclaration;
                    }
                    members.set(name, literalProp);
                });
                const indexInfos = type.flags & 4 /* String */ ? [createIndexInfo(stringType, emptyObjectType, 
                    /*isReadonly*/
                    false)] : emptyArray;
                return createAnonymousType(void 0, members, emptyArray, emptyArray, indexInfos);
            }