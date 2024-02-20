function isAmbientModuleDeclaration(node) {
            return node.kind === 264 /* ModuleDeclaration */ && node.name.kind === 10 /* StringLiteral */;
        }