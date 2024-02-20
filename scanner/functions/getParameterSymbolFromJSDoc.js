function getParameterSymbolFromJSDoc(node) {
            if (node.symbol) {
                return node.symbol;
            }
            if (!isIdentifier(node.name)) {
                return void 0;
            }
            const name = node.name.escapedText;
            const decl = getHostSignatureFromJSDoc(node);
            if (!decl) {
                return void 0;
            }
            const parameter = find(decl.parameters, (p) => p.name.kind === 79 /* Identifier */ && p.name.escapedText === name);
            return parameter && parameter.symbol;
        }