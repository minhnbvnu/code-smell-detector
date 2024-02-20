function getTransformFlagsSubtreeExclusions(kind) {
            if (kind >= 179 /* FirstTypeNode */ && kind <= 202 /* LastTypeNode */) {
                return -2 /* TypeExcludes */;
            }
            switch (kind) {
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                case 206 /* ArrayLiteralExpression */:
                    return -2147450880 /* ArrayLiteralOrCallOrNewExcludes */;
                case 264 /* ModuleDeclaration */:
                    return -1941676032 /* ModuleExcludes */;
                case 166 /* Parameter */:
                    return -2147483648 /* ParameterExcludes */;
                case 216 /* ArrowFunction */:
                    return -2072174592 /* ArrowFunctionExcludes */;
                case 215 /* FunctionExpression */:
                case 259 /* FunctionDeclaration */:
                    return -1937940480 /* FunctionExcludes */;
                case 258 /* VariableDeclarationList */:
                    return -2146893824 /* VariableDeclarationListExcludes */;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                    return -2147344384 /* ClassExcludes */;
                case 173 /* Constructor */:
                    return -1937948672 /* ConstructorExcludes */;
                case 169 /* PropertyDeclaration */:
                    return -2013249536 /* PropertyExcludes */;
                case 171 /* MethodDeclaration */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    return -2005057536 /* MethodOrAccessorExcludes */;
                case 131 /* AnyKeyword */:
                case 148 /* NumberKeyword */:
                case 160 /* BigIntKeyword */:
                case 144 /* NeverKeyword */:
                case 152 /* StringKeyword */:
                case 149 /* ObjectKeyword */:
                case 134 /* BooleanKeyword */:
                case 153 /* SymbolKeyword */:
                case 114 /* VoidKeyword */:
                case 165 /* TypeParameter */:
                case 168 /* PropertySignature */:
                case 170 /* MethodSignature */:
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 178 /* IndexSignature */:
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                    return -2 /* TypeExcludes */;
                case 207 /* ObjectLiteralExpression */:
                    return -2147278848 /* ObjectLiteralExcludes */;
                case 295 /* CatchClause */:
                    return -2147418112 /* CatchClauseExcludes */;
                case 203 /* ObjectBindingPattern */:
                case 204 /* ArrayBindingPattern */:
                    return -2147450880 /* BindingPatternExcludes */;
                case 213 /* TypeAssertionExpression */:
                case 235 /* SatisfiesExpression */:
                case 231 /* AsExpression */:
                case 356 /* PartiallyEmittedExpression */:
                case 214 /* ParenthesizedExpression */:
                case 106 /* SuperKeyword */:
                    return -2147483648 /* OuterExpressionExcludes */;
                case 208 /* PropertyAccessExpression */:
                case 209 /* ElementAccessExpression */:
                    return -2147483648 /* PropertyAccessExcludes */;
                default:
                    return -2147483648 /* NodeExcludes */;
            }
        }