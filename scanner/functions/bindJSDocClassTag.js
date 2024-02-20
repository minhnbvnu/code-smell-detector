function bindJSDocClassTag(node) {
                bindEachChild(node);
                const host = getHostSignatureFromJSDoc(node);
                if (host && host.kind !== 171 /* MethodDeclaration */) {
                    addDeclarationToSymbol(host.symbol, host, 32 /* Class */);
                }
            }