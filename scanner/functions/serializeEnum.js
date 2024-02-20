function serializeEnum(symbol, symbolName2, modifierFlags) {
                        addResult(factory.createEnumDeclaration(factory.createModifiersFromModifierFlags(isConstEnumSymbol(symbol) ? 2048 /* Const */ : 0), getInternalSymbolName(symbol, symbolName2), map(filter(getPropertiesOfType(getTypeOfSymbol(symbol)), (p) => !!(p.flags & 8 /* EnumMember */)), (p) => {
                            const initializedValue = p.declarations && p.declarations[0] && isEnumMember(p.declarations[0]) ? getConstantValue2(p.declarations[0]) : void 0;
                            return factory.createEnumMember(unescapeLeadingUnderscores(p.escapedName), initializedValue === void 0 ? void 0 : typeof initializedValue === "string" ? factory.createStringLiteral(initializedValue) : factory.createNumericLiteral(initializedValue));
                        })), modifierFlags);
                    }