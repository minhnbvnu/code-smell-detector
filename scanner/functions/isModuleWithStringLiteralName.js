function isModuleWithStringLiteralName(node) {
            return isModuleDeclaration(node) && node.name.kind === 10 /* StringLiteral */;
        }