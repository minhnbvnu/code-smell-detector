function isJSDocNamespaceBody(node) {
            const kind = node.kind;
            return kind === 79 /* Identifier */ || kind === 264 /* ModuleDeclaration */;
        }