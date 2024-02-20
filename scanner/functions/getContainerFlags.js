function getContainerFlags(node) {
            switch (node.kind) {
                case 228 /* ClassExpression */:
                case 260 /* ClassDeclaration */:
                case 263 /* EnumDeclaration */:
                case 207 /* ObjectLiteralExpression */:
                case 184 /* TypeLiteral */:
                case 325 /* JSDocTypeLiteral */:
                case 289 /* JsxAttributes */:
                    return 1 /* IsContainer */;
                case 261 /* InterfaceDeclaration */:
                    return 1 /* IsContainer */ | 64 /* IsInterface */;
                case 264 /* ModuleDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 197 /* MappedType */:
                case 178 /* IndexSignature */:
                    return 1 /* IsContainer */ | 32 /* HasLocals */;
                case 308 /* SourceFile */:
                    return 1 /* IsContainer */ | 4 /* IsControlFlowContainer */ | 32 /* HasLocals */;
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 171 /* MethodDeclaration */:
                    if (isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
                        return 1 /* IsContainer */ | 4 /* IsControlFlowContainer */ | 32 /* HasLocals */ | 8 /* IsFunctionLike */ | 128 /* IsObjectLiteralOrClassExpressionMethodOrAccessor */;
                    }
                case 173 /* Constructor */:
                case 259 /* FunctionDeclaration */:
                case 170 /* MethodSignature */:
                case 176 /* CallSignature */:
                case 326 /* JSDocSignature */:
                case 320 /* JSDocFunctionType */:
                case 181 /* FunctionType */:
                case 177 /* ConstructSignature */:
                case 182 /* ConstructorType */:
                case 172 /* ClassStaticBlockDeclaration */:
                    return 1 /* IsContainer */ | 4 /* IsControlFlowContainer */ | 32 /* HasLocals */ | 8 /* IsFunctionLike */;
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return 1 /* IsContainer */ | 4 /* IsControlFlowContainer */ | 32 /* HasLocals */ | 8 /* IsFunctionLike */ | 16 /* IsFunctionExpression */;
                case 265 /* ModuleBlock */:
                    return 4 /* IsControlFlowContainer */;
                case 169 /* PropertyDeclaration */:
                    return node.initializer ? 4 /* IsControlFlowContainer */ : 0;
                case 295 /* CatchClause */:
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 266 /* CaseBlock */:
                    return 2 /* IsBlockScopedContainer */ | 32 /* HasLocals */;
                case 238 /* Block */:
                    return isFunctionLike(node.parent) || isClassStaticBlockDeclaration(node.parent) ? 0 /* None */ : 2 /* IsBlockScopedContainer */ | 32 /* HasLocals */;
            }
            return 0 /* None */;
        }