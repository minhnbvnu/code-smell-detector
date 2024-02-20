function addInheritedMembers(symbols, baseSymbols) {
                for (const s of baseSymbols) {
                    if (!symbols.has(s.escapedName) && !isStaticPrivateIdentifierProperty(s)) {
                        symbols.set(s.escapedName, s);
                    }
                }
            }