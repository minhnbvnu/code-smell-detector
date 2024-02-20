function isShorthandAmbientModule(node) {
            return !!node && node.kind === 264 /* ModuleDeclaration */ && !node.body;
        }