function canPrefix(token) {
            switch (token.parent.kind) {
                case 166 /* Parameter */:
                case 165 /* TypeParameter */:
                    return true;
                case 257 /* VariableDeclaration */: {
                    const varDecl = token.parent;
                    switch (varDecl.parent.parent.kind) {
                        case 247 /* ForOfStatement */:
                        case 246 /* ForInStatement */:
                            return true;
                    }
                }
            }
            return false;
        }