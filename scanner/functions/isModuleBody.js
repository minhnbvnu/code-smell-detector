function isModuleBody(node) {
            const kind = node.kind;
            return kind === 265 /* ModuleBlock */ || kind === 264 /* ModuleDeclaration */ || kind === 79 /* Identifier */;
        }