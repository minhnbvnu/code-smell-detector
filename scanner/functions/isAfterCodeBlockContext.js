function isAfterCodeBlockContext(context) {
            switch (context.currentTokenParent.kind) {
                case 260 /* ClassDeclaration */:
                case 264 /* ModuleDeclaration */:
                case 263 /* EnumDeclaration */:
                case 295 /* CatchClause */:
                case 265 /* ModuleBlock */:
                case 252 /* SwitchStatement */:
                    return true;
                case 238 /* Block */: {
                    const blockParent = context.currentTokenParent.parent;
                    if (!blockParent || blockParent.kind !== 216 /* ArrowFunction */ && blockParent.kind !== 215 /* FunctionExpression */) {
                        return true;
                    }
                }
            }
            return false;
        }