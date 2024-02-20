function classifySymbol2(symbol, meaning) {
            const flags = symbol.getFlags();
            if (flags & 32 /* Class */) {
                return 0 /* class */;
            }
            else if (flags & 384 /* Enum */) {
                return 1 /* enum */;
            }
            else if (flags & 524288 /* TypeAlias */) {
                return 5 /* type */;
            }
            else if (flags & 64 /* Interface */) {
                if (meaning & 2 /* Type */) {
                    return 2 /* interface */;
                }
            }
            else if (flags & 262144 /* TypeParameter */) {
                return 4 /* typeParameter */;
            }
            let decl = symbol.valueDeclaration || symbol.declarations && symbol.declarations[0];
            if (decl && isBindingElement(decl)) {
                decl = getDeclarationForBindingElement(decl);
            }
            return decl && tokenFromDeclarationMapping.get(decl.kind);
        }