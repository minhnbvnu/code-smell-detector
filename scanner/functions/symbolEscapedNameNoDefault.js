function symbolEscapedNameNoDefault(symbol) {
            if (symbol.escapedName !== "default" /* Default */) {
                return symbol.escapedName;
            }
            return firstDefined(symbol.declarations, (decl) => {
                const name = getNameOfDeclaration(decl);
                return name && name.kind === 79 /* Identifier */ ? name.escapedText : void 0;
            });
        }