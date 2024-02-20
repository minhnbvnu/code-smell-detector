function lookupSymbolForPrivateIdentifierDeclaration(propName, location) {
                for (let containingClass = getContainingClass(location); !!containingClass; containingClass = getContainingClass(containingClass)) {
                    const { symbol } = containingClass;
                    const name = getSymbolNameForPrivateIdentifier(symbol, propName);
                    const prop = symbol.members && symbol.members.get(name) || symbol.exports && symbol.exports.get(name);
                    if (prop) {
                        return prop;
                    }
                }
            }