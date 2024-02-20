function isVariableDeclarationInVariableStatement(node) {
            return node.parent.kind === 258 /* VariableDeclarationList */ && node.parent.parent.kind === 240 /* VariableStatement */;
        }