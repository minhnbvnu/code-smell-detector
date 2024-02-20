function getLiteralTypeFromProperty(prop, include, includeNonPublic) {
                if (includeNonPublic || !(getDeclarationModifierFlagsFromSymbol(prop) & 24 /* NonPublicAccessibilityModifier */)) {
                    let type = getSymbolLinks(getLateBoundSymbol(prop)).nameType;
                    if (!type) {
                        const name = getNameOfDeclaration(prop.valueDeclaration);
                        type = prop.escapedName === "default" /* Default */ ? getStringLiteralType("default") : name && getLiteralTypeFromPropertyName(name) || (!isKnownSymbol(prop) ? getStringLiteralType(symbolName(prop)) : void 0);
                    }
                    if (type && type.flags & include) {
                        return type;
                    }
                }
                return neverType;
            }