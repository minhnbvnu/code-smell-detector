function forEachIdentifierInEntityName(e, parent3, action) {
                if (isExportsOrModuleExportsOrAlias(file, e)) {
                    return file.symbol;
                }
                else if (isIdentifier(e)) {
                    return action(e, lookupSymbolForPropertyAccess(e), parent3);
                }
                else {
                    const s = forEachIdentifierInEntityName(e.expression, parent3, action);
                    const name = getNameOrArgument(e);
                    if (isPrivateIdentifier(name)) {
                        Debug.fail("unexpected PrivateIdentifier");
                    }
                    return action(name, s && s.exports && s.exports.get(getElementOrPropertyAccessName(e)), s);
                }
            }