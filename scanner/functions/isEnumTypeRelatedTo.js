function isEnumTypeRelatedTo(source, target, errorReporter) {
                const sourceSymbol = source.flags & 8 /* EnumMember */ ? getParentOfSymbol(source) : source;
                const targetSymbol = target.flags & 8 /* EnumMember */ ? getParentOfSymbol(target) : target;
                if (sourceSymbol === targetSymbol) {
                    return true;
                }
                if (sourceSymbol.escapedName !== targetSymbol.escapedName || !(sourceSymbol.flags & 256 /* RegularEnum */) || !(targetSymbol.flags & 256 /* RegularEnum */)) {
                    return false;
                }
                const id = getSymbolId(sourceSymbol) + "," + getSymbolId(targetSymbol);
                const entry = enumRelation.get(id);
                if (entry !== void 0 && !(!(entry & 4 /* Reported */) && entry & 2 /* Failed */ && errorReporter)) {
                    return !!(entry & 1 /* Succeeded */);
                }
                const targetEnumType = getTypeOfSymbol(targetSymbol);
                for (const property of getPropertiesOfType(getTypeOfSymbol(sourceSymbol))) {
                    if (property.flags & 8 /* EnumMember */) {
                        const targetProperty = getPropertyOfType(targetEnumType, property.escapedName);
                        if (!targetProperty || !(targetProperty.flags & 8 /* EnumMember */)) {
                            if (errorReporter) {
                                errorReporter(Diagnostics.Property_0_is_missing_in_type_1, symbolName(property), typeToString(getDeclaredTypeOfSymbol(targetSymbol), 
                                /*enclosingDeclaration*/
                                void 0, 64 /* UseFullyQualifiedType */));
                                enumRelation.set(id, 2 /* Failed */ | 4 /* Reported */);
                            }
                            else {
                                enumRelation.set(id, 2 /* Failed */);
                            }
                            return false;
                        }
                    }
                }
                enumRelation.set(id, 1 /* Succeeded */);
                return true;
            }