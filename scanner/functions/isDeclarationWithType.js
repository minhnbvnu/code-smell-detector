function isDeclarationWithType(node) {
            return isFunctionLikeDeclaration(node) || node.kind === 257 /* VariableDeclaration */ || node.kind === 168 /* PropertySignature */ || node.kind === 169 /* PropertyDeclaration */;
        }