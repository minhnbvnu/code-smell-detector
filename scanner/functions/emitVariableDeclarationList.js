function emitVariableDeclarationList(node) {
                writeKeyword(isLet(node) ? "let" : isVarConst(node) ? "const" : "var");
                writeSpace();
                emitList(node, node.declarations, 528 /* VariableDeclarationList */);
            }