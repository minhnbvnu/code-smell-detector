function resolveJSDocMemberName(name, ignoreErrors, container) {
                if (isEntityName(name)) {
                    const meaning = 788968 /* Type */ | 1920 /* Namespace */ | 111551 /* Value */;
                    let symbol = resolveEntityName(name, meaning, ignoreErrors, 
                    /*dontResolveAlias*/
                    true, getHostSignatureFromJSDoc(name));
                    if (!symbol && isIdentifier(name) && container) {
                        symbol = getMergedSymbol(getSymbol2(getExportsOfSymbol(container), name.escapedText, meaning));
                    }
                    if (symbol) {
                        return symbol;
                    }
                }
                const left = isIdentifier(name) ? container : resolveJSDocMemberName(name.left, ignoreErrors, container);
                const right = isIdentifier(name) ? name.escapedText : name.right.escapedText;
                if (left) {
                    const proto = left.flags & 111551 /* Value */ && getPropertyOfType(getTypeOfSymbol(left), "prototype");
                    const t = proto ? getTypeOfSymbol(proto) : getDeclaredTypeOfSymbol(left);
                    return getPropertyOfType(t, right);
                }
            }