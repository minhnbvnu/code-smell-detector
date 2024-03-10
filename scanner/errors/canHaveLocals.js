function canHaveLocals(node) {
            switch (node.kind) {
                case 216 /* ArrowFunction */:
                case 238 /* Block */:
                case 176 /* CallSignature */:
                case 266 /* CaseBlock */:
                case 295 /* CatchClause */:
                case 172 /* ClassStaticBlockDeclaration */:
                case 191 /* ConditionalType */:
                case 173 /* Constructor */:
                case 182 /* ConstructorType */:
                case 177 /* ConstructSignature */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 181 /* FunctionType */:
                case 174 /* GetAccessor */:
                case 178 /* IndexSignature */:
                case 341 /* JSDocCallbackTag */:
                case 343 /* JSDocEnumTag */:
                case 320 /* JSDocFunctionType */:
                case 326 /* JSDocSignature */:
                case 349 /* JSDocTypedefTag */:
                case 197 /* MappedType */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 264 /* ModuleDeclaration */:
                case 175 /* SetAccessor */:
                case 308 /* SourceFile */:
                case 262 /* TypeAliasDeclaration */:
                    return true;
                default:
                    return false;
            }
        }