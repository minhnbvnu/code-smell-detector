function isStatementConditionContext(context) {
            switch (context.contextNode.kind) {
                case 242 /* IfStatement */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 243 /* DoStatement */:
                case 244 /* WhileStatement */:
                    return true;
                default:
                    return false;
            }
        }