function addDeclarationToLateBoundSymbol(symbol, member, symbolFlags) {
                Debug.assert(!!(getCheckFlags(symbol) & 4096 /* Late */), "Expected a late-bound symbol.");
                symbol.flags |= symbolFlags;
                getSymbolLinks(member.symbol).lateSymbol = symbol;
                if (!symbol.declarations) {
                    symbol.declarations = [member];
                }
                else if (!member.symbol.isReplaceableByMethod) {
                    symbol.declarations.push(member);
                }
                if (symbolFlags & 111551 /* Value */) {
                    if (!symbol.valueDeclaration || symbol.valueDeclaration.kind !== member.kind) {
                        symbol.valueDeclaration = member;
                    }
                }
            }