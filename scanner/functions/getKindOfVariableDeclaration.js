function getKindOfVariableDeclaration(v) {
                return isVarConst(v) ? "const" /* constElement */ : isLet(v) ? "let" /* letElement */ : "var" /* variableElement */;
            }