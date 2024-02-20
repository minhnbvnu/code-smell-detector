function createPropertyNameFromSymbol(symbol, target, quotePreference, checker) {
            if (isTransientSymbol(symbol)) {
                const prop = checker.symbolToNode(symbol, 111551 /* Value */, 
                /*enclosingDeclaration*/
                void 0, 1073741824 /* WriteComputedProps */);
                if (prop && isComputedPropertyName(prop))
                    return prop;
            }
            return createPropertyNameNodeForIdentifierOrLiteral(symbol.name, target, quotePreference === 0 /* Single */);
        }