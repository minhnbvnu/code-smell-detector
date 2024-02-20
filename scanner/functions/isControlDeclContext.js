function isControlDeclContext(context) {
            switch (context.contextNode.kind) {
                case 242 /* IfStatement */:
                case 252 /* SwitchStatement */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 244 /* WhileStatement */:
                case 255 /* TryStatement */:
                case 243 /* DoStatement */:
                case 251 /* WithStatement */:
                case 295 /* CatchClause */:
                    return true;
                default:
                    return false;
            }
        }