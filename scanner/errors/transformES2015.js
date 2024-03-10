            function visitorWorker(node, expressionResultIsUnused2) {
                switch (node.kind) {
                    case 124 /* StaticKeyword */:
                        return void 0;
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 216 /* ArrowFunction */:
                        return visitArrowFunction(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 79 /* Identifier */:
                        return visitIdentifier(node);
                    case 258 /* VariableDeclarationList */:
                        return visitVariableDeclarationList(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 266 /* CaseBlock */:
                        return visitCaseBlock(node);
                    case 238 /* Block */:
                        return visitBlock(node, 
                        /*isFunctionBody*/
                        false);
                    case 249 /* BreakStatement */:
                    case 248 /* ContinueStatement */:
                        return visitBreakOrContinueStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        return visitDoOrWhileStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 300 /* ShorthandPropertyAssignment */:
                        return visitShorthandPropertyAssignment(node);
                    case 164 /* ComputedPropertyName */:
                        return visitComputedPropertyName(node);
                    case 206 /* ArrayLiteralExpression */:
                        return visitArrayLiteralExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, expressionResultIsUnused2);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, expressionResultIsUnused2);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, expressionResultIsUnused2);
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 15 /* TemplateHead */:
                    case 16 /* TemplateMiddle */:
                    case 17 /* TemplateTail */:
                        return visitTemplateLiteral(node);
                    case 10 /* StringLiteral */:
                        return visitStringLiteral(node);
                    case 8 /* NumericLiteral */:
                        return visitNumericLiteral(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 225 /* TemplateExpression */:
                        return visitTemplateExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 227 /* SpreadElement */:
                        return visitSpreadElement(node);
                    case 106 /* SuperKeyword */:
                        return visitSuperKeyword(
                        /*isExpressionOfCall*/
                        false);
                    case 108 /* ThisKeyword */:
                        return visitThisKeyword(node);
                    case 233 /* MetaProperty */:
                        return visitMetaProperty(node);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return visitAccessorDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    case 219 /* VoidExpression */:
                        return visitVoidExpression(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }