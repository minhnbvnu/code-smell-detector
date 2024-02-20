function isBlockScope(node, parentNode) {
            switch (node.kind) {
                case 308 /* SourceFile */:
                case 266 /* CaseBlock */:
                case 295 /* CatchClause */:
                case 264 /* ModuleDeclaration */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 173 /* Constructor */:
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 169 /* PropertyDeclaration */:
                case 172 /* ClassStaticBlockDeclaration */:
                    return true;
                case 238 /* Block */:
                    return !isFunctionLikeOrClassStaticBlockDeclaration(parentNode);
            }
            return false;
        }