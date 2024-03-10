function bindChildren(node) {
                const saveInAssignmentPattern = inAssignmentPattern;
                inAssignmentPattern = false;
                if (checkUnreachable(node)) {
                    bindEachChild(node);
                    bindJSDoc(node);
                    inAssignmentPattern = saveInAssignmentPattern;
                    return;
                }
                if (node.kind >= 240 /* FirstStatement */ && node.kind <= 256 /* LastStatement */ && !options.allowUnreachableCode) {
                    node.flowNode = currentFlow;
                }
                switch (node.kind) {
                    case 244 /* WhileStatement */:
                        bindWhileStatement(node);
                        break;
                    case 243 /* DoStatement */:
                        bindDoStatement(node);
                        break;
                    case 245 /* ForStatement */:
                        bindForStatement(node);
                        break;
                    case 246 /* ForInStatement */:
                    case 247 /* ForOfStatement */:
                        bindForInOrForOfStatement(node);
                        break;
                    case 242 /* IfStatement */:
                        bindIfStatement(node);
                        break;
                    case 250 /* ReturnStatement */:
                    case 254 /* ThrowStatement */:
                        bindReturnOrThrow(node);
                        break;
                    case 249 /* BreakStatement */:
                    case 248 /* ContinueStatement */:
                        bindBreakOrContinueStatement(node);
                        break;
                    case 255 /* TryStatement */:
                        bindTryStatement(node);
                        break;
                    case 252 /* SwitchStatement */:
                        bindSwitchStatement(node);
                        break;
                    case 266 /* CaseBlock */:
                        bindCaseBlock(node);
                        break;
                    case 292 /* CaseClause */:
                        bindCaseClause(node);
                        break;
                    case 241 /* ExpressionStatement */:
                        bindExpressionStatement(node);
                        break;
                    case 253 /* LabeledStatement */:
                        bindLabeledStatement(node);
                        break;
                    case 221 /* PrefixUnaryExpression */:
                        bindPrefixUnaryExpressionFlow(node);
                        break;
                    case 222 /* PostfixUnaryExpression */:
                        bindPostfixUnaryExpressionFlow(node);
                        break;
                    case 223 /* BinaryExpression */:
                        if (isDestructuringAssignment(node)) {
                            inAssignmentPattern = saveInAssignmentPattern;
                            bindDestructuringAssignmentFlow(node);
                            return;
                        }
                        bindBinaryExpressionFlow(node);
                        break;
                    case 217 /* DeleteExpression */:
                        bindDeleteExpressionFlow(node);
                        break;
                    case 224 /* ConditionalExpression */:
                        bindConditionalExpressionFlow(node);
                        break;
                    case 257 /* VariableDeclaration */:
                        bindVariableDeclarationFlow(node);
                        break;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        bindAccessExpressionFlow(node);
                        break;
                    case 210 /* CallExpression */:
                        bindCallExpressionFlow(node);
                        break;
                    case 232 /* NonNullExpression */:
                        bindNonNullExpressionFlow(node);
                        break;
                    case 349 /* JSDocTypedefTag */:
                    case 341 /* JSDocCallbackTag */:
                    case 343 /* JSDocEnumTag */:
                        bindJSDocTypeAlias(node);
                        break;
                    case 308 /* SourceFile */: {
                        bindEachFunctionsFirst(node.statements);
                        bind(node.endOfFileToken);
                        break;
                    }
                    case 238 /* Block */:
                    case 265 /* ModuleBlock */:
                        bindEachFunctionsFirst(node.statements);
                        break;
                    case 205 /* BindingElement */:
                        bindBindingElementFlow(node);
                        break;
                    case 166 /* Parameter */:
                        bindParameterFlow(node);
                        break;
                    case 207 /* ObjectLiteralExpression */:
                    case 206 /* ArrayLiteralExpression */:
                    case 299 /* PropertyAssignment */:
                    case 227 /* SpreadElement */:
                        inAssignmentPattern = saveInAssignmentPattern;
                    default:
                        bindEachChild(node);
                        break;
                }
                bindJSDoc(node);
                inAssignmentPattern = saveInAssignmentPattern;
            }