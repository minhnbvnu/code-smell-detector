function isCompletedNode(n, sourceFile) {
            if (n === void 0 || nodeIsMissing(n)) {
                return false;
            }
            switch (n.kind) {
                case 260 /* ClassDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                case 207 /* ObjectLiteralExpression */:
                case 203 /* ObjectBindingPattern */:
                case 184 /* TypeLiteral */:
                case 238 /* Block */:
                case 265 /* ModuleBlock */:
                case 266 /* CaseBlock */:
                case 272 /* NamedImports */:
                case 276 /* NamedExports */:
                    return nodeEndsWith(n, 19 /* CloseBraceToken */, sourceFile);
                case 295 /* CatchClause */:
                    return isCompletedNode(n.block, sourceFile);
                case 211 /* NewExpression */:
                    if (!n.arguments) {
                        return true;
                    }
                case 210 /* CallExpression */:
                case 214 /* ParenthesizedExpression */:
                case 193 /* ParenthesizedType */:
                    return nodeEndsWith(n, 21 /* CloseParenToken */, sourceFile);
                case 181 /* FunctionType */:
                case 182 /* ConstructorType */:
                    return isCompletedNode(n.type, sourceFile);
                case 173 /* Constructor */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 177 /* ConstructSignature */:
                case 176 /* CallSignature */:
                case 216 /* ArrowFunction */:
                    if (n.body) {
                        return isCompletedNode(n.body, sourceFile);
                    }
                    if (n.type) {
                        return isCompletedNode(n.type, sourceFile);
                    }
                    return hasChildOfKind(n, 21 /* CloseParenToken */, sourceFile);
                case 264 /* ModuleDeclaration */:
                    return !!n.body && isCompletedNode(n.body, sourceFile);
                case 242 /* IfStatement */:
                    if (n.elseStatement) {
                        return isCompletedNode(n.elseStatement, sourceFile);
                    }
                    return isCompletedNode(n.thenStatement, sourceFile);
                case 241 /* ExpressionStatement */:
                    return isCompletedNode(n.expression, sourceFile) || hasChildOfKind(n, 26 /* SemicolonToken */, sourceFile);
                case 206 /* ArrayLiteralExpression */:
                case 204 /* ArrayBindingPattern */:
                case 209 /* ElementAccessExpression */:
                case 164 /* ComputedPropertyName */:
                case 186 /* TupleType */:
                    return nodeEndsWith(n, 23 /* CloseBracketToken */, sourceFile);
                case 178 /* IndexSignature */:
                    if (n.type) {
                        return isCompletedNode(n.type, sourceFile);
                    }
                    return hasChildOfKind(n, 23 /* CloseBracketToken */, sourceFile);
                case 292 /* CaseClause */:
                case 293 /* DefaultClause */:
                    return false;
                case 245 /* ForStatement */:
                case 246 /* ForInStatement */:
                case 247 /* ForOfStatement */:
                case 244 /* WhileStatement */:
                    return isCompletedNode(n.statement, sourceFile);
                case 243 /* DoStatement */:
                    return hasChildOfKind(n, 115 /* WhileKeyword */, sourceFile) ? nodeEndsWith(n, 21 /* CloseParenToken */, sourceFile) : isCompletedNode(n.statement, sourceFile);
                case 183 /* TypeQuery */:
                    return isCompletedNode(n.exprName, sourceFile);
                case 218 /* TypeOfExpression */:
                case 217 /* DeleteExpression */:
                case 219 /* VoidExpression */:
                case 226 /* YieldExpression */:
                case 227 /* SpreadElement */:
                    const unaryWordExpression = n;
                    return isCompletedNode(unaryWordExpression.expression, sourceFile);
                case 212 /* TaggedTemplateExpression */:
                    return isCompletedNode(n.template, sourceFile);
                case 225 /* TemplateExpression */:
                    const lastSpan = lastOrUndefined(n.templateSpans);
                    return isCompletedNode(lastSpan, sourceFile);
                case 236 /* TemplateSpan */:
                    return nodeIsPresent(n.literal);
                case 275 /* ExportDeclaration */:
                case 269 /* ImportDeclaration */:
                    return nodeIsPresent(n.moduleSpecifier);
                case 221 /* PrefixUnaryExpression */:
                    return isCompletedNode(n.operand, sourceFile);
                case 223 /* BinaryExpression */:
                    return isCompletedNode(n.right, sourceFile);
                case 224 /* ConditionalExpression */:
                    return isCompletedNode(n.whenFalse, sourceFile);
                default:
                    return true;
            }
        }