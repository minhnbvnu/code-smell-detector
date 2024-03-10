            function spanInNode(node) {
                if (node) {
                    const { parent: parent2 } = node;
                    switch (node.kind) {
                        case 240 /* VariableStatement */:
                            return spanInVariableDeclaration(node.declarationList.declarations[0]);
                        case 257 /* VariableDeclaration */:
                        case 169 /* PropertyDeclaration */:
                        case 168 /* PropertySignature */:
                            return spanInVariableDeclaration(node);
                        case 166 /* Parameter */:
                            return spanInParameterDeclaration(node);
                        case 259 /* FunctionDeclaration */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 173 /* Constructor */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                            return spanInFunctionDeclaration(node);
                        case 238 /* Block */:
                            if (isFunctionBlock(node)) {
                                return spanInFunctionBlock(node);
                            }
                        case 265 /* ModuleBlock */:
                            return spanInBlock(node);
                        case 295 /* CatchClause */:
                            return spanInBlock(node.block);
                        case 241 /* ExpressionStatement */:
                            return textSpan(node.expression);
                        case 250 /* ReturnStatement */:
                            return textSpan(node.getChildAt(0), node.expression);
                        case 244 /* WhileStatement */:
                            return textSpanEndingAtNextToken(node, node.expression);
                        case 243 /* DoStatement */:
                            return spanInNode(node.statement);
                        case 256 /* DebuggerStatement */:
                            return textSpan(node.getChildAt(0));
                        case 242 /* IfStatement */:
                            return textSpanEndingAtNextToken(node, node.expression);
                        case 253 /* LabeledStatement */:
                            return spanInNode(node.statement);
                        case 249 /* BreakStatement */:
                        case 248 /* ContinueStatement */:
                            return textSpan(node.getChildAt(0), node.label);
                        case 245 /* ForStatement */:
                            return spanInForStatement(node);
                        case 246 /* ForInStatement */:
                            return textSpanEndingAtNextToken(node, node.expression);
                        case 247 /* ForOfStatement */:
                            return spanInInitializerOfForLike(node);
                        case 252 /* SwitchStatement */:
                            return textSpanEndingAtNextToken(node, node.expression);
                        case 292 /* CaseClause */:
                        case 293 /* DefaultClause */:
                            return spanInNode(node.statements[0]);
                        case 255 /* TryStatement */:
                            return spanInBlock(node.tryBlock);
                        case 254 /* ThrowStatement */:
                            return textSpan(node, node.expression);
                        case 274 /* ExportAssignment */:
                            return textSpan(node, node.expression);
                        case 268 /* ImportEqualsDeclaration */:
                            return textSpan(node, node.moduleReference);
                        case 269 /* ImportDeclaration */:
                            return textSpan(node, node.moduleSpecifier);
                        case 275 /* ExportDeclaration */:
                            return textSpan(node, node.moduleSpecifier);
                        case 264 /* ModuleDeclaration */:
                            if (getModuleInstanceState(node) !== 1 /* Instantiated */) {
                                return void 0;
                            }
                        case 260 /* ClassDeclaration */:
                        case 263 /* EnumDeclaration */:
                        case 302 /* EnumMember */:
                        case 205 /* BindingElement */:
                            return textSpan(node);
                        case 251 /* WithStatement */:
                            return spanInNode(node.statement);
                        case 167 /* Decorator */:
                            return spanInNodeArray(parent2.modifiers, node, isDecorator);
                        case 203 /* ObjectBindingPattern */:
                        case 204 /* ArrayBindingPattern */:
                            return spanInBindingPattern(node);
                        case 261 /* InterfaceDeclaration */:
                        case 262 /* TypeAliasDeclaration */:
                            return void 0;
                        case 26 /* SemicolonToken */:
                        case 1 /* EndOfFileToken */:
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile));
                        case 27 /* CommaToken */:
                            return spanInPreviousNode(node);
                        case 18 /* OpenBraceToken */:
                            return spanInOpenBraceToken(node);
                        case 19 /* CloseBraceToken */:
                            return spanInCloseBraceToken(node);
                        case 23 /* CloseBracketToken */:
                            return spanInCloseBracketToken(node);
                        case 20 /* OpenParenToken */:
                            return spanInOpenParenToken(node);
                        case 21 /* CloseParenToken */:
                            return spanInCloseParenToken(node);
                        case 58 /* ColonToken */:
                            return spanInColonToken(node);
                        case 31 /* GreaterThanToken */:
                        case 29 /* LessThanToken */:
                            return spanInGreaterThanOrLessThanToken(node);
                        case 115 /* WhileKeyword */:
                            return spanInWhileKeyword(node);
                        case 91 /* ElseKeyword */:
                        case 83 /* CatchKeyword */:
                        case 96 /* FinallyKeyword */:
                            return spanInNextNode(node);
                        case 162 /* OfKeyword */:
                            return spanInOfKeyword(node);
                        default:
                            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node)) {
                                return spanInArrayLiteralOrObjectLiteralDestructuringPattern(node);
                            }
                            if ((node.kind === 79 /* Identifier */ || node.kind === 227 /* SpreadElement */ || node.kind === 299 /* PropertyAssignment */ || node.kind === 300 /* ShorthandPropertyAssignment */) && isArrayLiteralOrObjectLiteralDestructuringPattern(parent2)) {
                                return textSpan(node);
                            }
                            if (node.kind === 223 /* BinaryExpression */) {
                                const { left, operatorToken } = node;
                                if (isArrayLiteralOrObjectLiteralDestructuringPattern(left)) {
                                    return spanInArrayLiteralOrObjectLiteralDestructuringPattern(left);
                                }
                                if (operatorToken.kind === 63 /* EqualsToken */ && isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent)) {
                                    return textSpan(node);
                                }
                                if (operatorToken.kind === 27 /* CommaToken */) {
                                    return spanInNode(left);
                                }
                            }
                            if (isExpressionNode(node)) {
                                switch (parent2.kind) {
                                    case 243 /* DoStatement */:
                                        return spanInPreviousNode(node);
                                    case 167 /* Decorator */:
                                        return spanInNode(node.parent);
                                    case 245 /* ForStatement */:
                                    case 247 /* ForOfStatement */:
                                        return textSpan(node);
                                    case 223 /* BinaryExpression */:
                                        if (node.parent.operatorToken.kind === 27 /* CommaToken */) {
                                            return textSpan(node);
                                        }
                                        break;
                                    case 216 /* ArrowFunction */:
                                        if (node.parent.body === node) {
                                            return textSpan(node);
                                        }
                                        break;
                                }
                            }
                            switch (node.parent.kind) {
                                case 299 /* PropertyAssignment */:
                                    if (node.parent.name === node && !isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent.parent)) {
                                        return spanInNode(node.parent.initializer);
                                    }
                                    break;
                                case 213 /* TypeAssertionExpression */:
                                    if (node.parent.type === node) {
                                        return spanInNextNode(node.parent.type);
                                    }
                                    break;
                                case 257 /* VariableDeclaration */:
                                case 166 /* Parameter */: {
                                    const { initializer, type } = node.parent;
                                    if (initializer === node || type === node || isAssignmentOperator(node.kind)) {
                                        return spanInPreviousNode(node);
                                    }
                                    break;
                                }
                                case 223 /* BinaryExpression */: {
                                    const { left } = node.parent;
                                    if (isArrayLiteralOrObjectLiteralDestructuringPattern(left) && node !== left) {
                                        return spanInPreviousNode(node);
                                    }
                                    break;
                                }
                                default:
                                    if (isFunctionLike(node.parent) && node.parent.type === node) {
                                        return spanInPreviousNode(node);
                                    }
                            }
                            return spanInNode(node.parent);
                    }
                }
                function textSpanFromVariableDeclaration(variableDeclaration) {
                    if (isVariableDeclarationList(variableDeclaration.parent) && variableDeclaration.parent.declarations[0] === variableDeclaration) {
                        return textSpan(findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent), variableDeclaration);
                    }
                    else {
                        return textSpan(variableDeclaration);
                    }
                }
                function spanInVariableDeclaration(variableDeclaration) {
                    if (variableDeclaration.parent.parent.kind === 246 /* ForInStatement */) {
                        return spanInNode(variableDeclaration.parent.parent);
                    }
                    const parent2 = variableDeclaration.parent;
                    if (isBindingPattern(variableDeclaration.name)) {
                        return spanInBindingPattern(variableDeclaration.name);
                    }
                    if (hasOnlyExpressionInitializer(variableDeclaration) && variableDeclaration.initializer || hasSyntacticModifier(variableDeclaration, 1 /* Export */) || parent2.parent.kind === 247 /* ForOfStatement */) {
                        return textSpanFromVariableDeclaration(variableDeclaration);
                    }
                    if (isVariableDeclarationList(variableDeclaration.parent) && variableDeclaration.parent.declarations[0] !== variableDeclaration) {
                        return spanInNode(findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent));
                    }
                }
                function canHaveSpanInParameterDeclaration(parameter) {
                    return !!parameter.initializer || parameter.dotDotDotToken !== void 0 || hasSyntacticModifier(parameter, 4 /* Public */ | 8 /* Private */);
                }
                function spanInParameterDeclaration(parameter) {
                    if (isBindingPattern(parameter.name)) {
                        return spanInBindingPattern(parameter.name);
                    }
                    else if (canHaveSpanInParameterDeclaration(parameter)) {
                        return textSpan(parameter);
                    }
                    else {
                        const functionDeclaration = parameter.parent;
                        const indexOfParameter = functionDeclaration.parameters.indexOf(parameter);
                        Debug.assert(indexOfParameter !== -1);
                        if (indexOfParameter !== 0) {
                            return spanInParameterDeclaration(functionDeclaration.parameters[indexOfParameter - 1]);
                        }
                        else {
                            return spanInNode(functionDeclaration.body);
                        }
                    }
                }
                function canFunctionHaveSpanInWholeDeclaration(functionDeclaration) {
                    return hasSyntacticModifier(functionDeclaration, 1 /* Export */) || functionDeclaration.parent.kind === 260 /* ClassDeclaration */ && functionDeclaration.kind !== 173 /* Constructor */;
                }
                function spanInFunctionDeclaration(functionDeclaration) {
                    if (!functionDeclaration.body) {
                        return void 0;
                    }
                    if (canFunctionHaveSpanInWholeDeclaration(functionDeclaration)) {
                        return textSpan(functionDeclaration);
                    }
                    return spanInNode(functionDeclaration.body);
                }
                function spanInFunctionBlock(block) {
                    const nodeForSpanInBlock = block.statements.length ? block.statements[0] : block.getLastToken();
                    if (canFunctionHaveSpanInWholeDeclaration(block.parent)) {
                        return spanInNodeIfStartsOnSameLine(block.parent, nodeForSpanInBlock);
                    }
                    return spanInNode(nodeForSpanInBlock);
                }
                function spanInBlock(block) {
                    switch (block.parent.kind) {
                        case 264 /* ModuleDeclaration */:
                            if (getModuleInstanceState(block.parent) !== 1 /* Instantiated */) {
                                return void 0;
                            }
                        case 244 /* WhileStatement */:
                        case 242 /* IfStatement */:
                        case 246 /* ForInStatement */:
                            return spanInNodeIfStartsOnSameLine(block.parent, block.statements[0]);
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(block.pos, sourceFile, block.parent), block.statements[0]);
                    }
                    return spanInNode(block.statements[0]);
                }
                function spanInInitializerOfForLike(forLikeStatement) {
                    if (forLikeStatement.initializer.kind === 258 /* VariableDeclarationList */) {
                        const variableDeclarationList = forLikeStatement.initializer;
                        if (variableDeclarationList.declarations.length > 0) {
                            return spanInNode(variableDeclarationList.declarations[0]);
                        }
                    }
                    else {
                        return spanInNode(forLikeStatement.initializer);
                    }
                }
                function spanInForStatement(forStatement) {
                    if (forStatement.initializer) {
                        return spanInInitializerOfForLike(forStatement);
                    }
                    if (forStatement.condition) {
                        return textSpan(forStatement.condition);
                    }
                    if (forStatement.incrementor) {
                        return textSpan(forStatement.incrementor);
                    }
                }
                function spanInBindingPattern(bindingPattern) {
                    const firstBindingElement = forEach(bindingPattern.elements, (element) => element.kind !== 229 /* OmittedExpression */ ? element : void 0);
                    if (firstBindingElement) {
                        return spanInNode(firstBindingElement);
                    }
                    if (bindingPattern.parent.kind === 205 /* BindingElement */) {
                        return textSpan(bindingPattern.parent);
                    }
                    return textSpanFromVariableDeclaration(bindingPattern.parent);
                }
                function spanInArrayLiteralOrObjectLiteralDestructuringPattern(node2) {
                    Debug.assert(node2.kind !== 204 /* ArrayBindingPattern */ && node2.kind !== 203 /* ObjectBindingPattern */);
                    const elements = node2.kind === 206 /* ArrayLiteralExpression */ ? node2.elements : node2.properties;
                    const firstBindingElement = forEach(elements, (element) => element.kind !== 229 /* OmittedExpression */ ? element : void 0);
                    if (firstBindingElement) {
                        return spanInNode(firstBindingElement);
                    }
                    return textSpan(node2.parent.kind === 223 /* BinaryExpression */ ? node2.parent : node2);
                }
                function spanInOpenBraceToken(node2) {
                    switch (node2.parent.kind) {
                        case 263 /* EnumDeclaration */:
                            const enumDeclaration = node2.parent;
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(node2.pos, sourceFile, node2.parent), enumDeclaration.members.length ? enumDeclaration.members[0] : enumDeclaration.getLastToken(sourceFile));
                        case 260 /* ClassDeclaration */:
                            const classDeclaration = node2.parent;
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(node2.pos, sourceFile, node2.parent), classDeclaration.members.length ? classDeclaration.members[0] : classDeclaration.getLastToken(sourceFile));
                        case 266 /* CaseBlock */:
                            return spanInNodeIfStartsOnSameLine(node2.parent.parent, node2.parent.clauses[0]);
                    }
                    return spanInNode(node2.parent);
                }
                function spanInCloseBraceToken(node2) {
                    switch (node2.parent.kind) {
                        case 265 /* ModuleBlock */:
                            if (getModuleInstanceState(node2.parent.parent) !== 1 /* Instantiated */) {
                                return void 0;
                            }
                        case 263 /* EnumDeclaration */:
                        case 260 /* ClassDeclaration */:
                            return textSpan(node2);
                        case 238 /* Block */:
                            if (isFunctionBlock(node2.parent)) {
                                return textSpan(node2);
                            }
                        case 295 /* CatchClause */:
                            return spanInNode(lastOrUndefined(node2.parent.statements));
                        case 266 /* CaseBlock */:
                            const caseBlock = node2.parent;
                            const lastClause = lastOrUndefined(caseBlock.clauses);
                            if (lastClause) {
                                return spanInNode(lastOrUndefined(lastClause.statements));
                            }
                            return void 0;
                        case 203 /* ObjectBindingPattern */:
                            const bindingPattern = node2.parent;
                            return spanInNode(lastOrUndefined(bindingPattern.elements) || bindingPattern);
                        default:
                            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node2.parent)) {
                                const objectLiteral = node2.parent;
                                return textSpan(lastOrUndefined(objectLiteral.properties) || objectLiteral);
                            }
                            return spanInNode(node2.parent);
                    }
                }
                function spanInCloseBracketToken(node2) {
                    switch (node2.parent.kind) {
                        case 204 /* ArrayBindingPattern */:
                            const bindingPattern = node2.parent;
                            return textSpan(lastOrUndefined(bindingPattern.elements) || bindingPattern);
                        default:
                            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node2.parent)) {
                                const arrayLiteral = node2.parent;
                                return textSpan(lastOrUndefined(arrayLiteral.elements) || arrayLiteral);
                            }
                            return spanInNode(node2.parent);
                    }
                }
                function spanInOpenParenToken(node2) {
                    if (node2.parent.kind === 243 /* DoStatement */ || // Go to while keyword and do action instead
                        node2.parent.kind === 210 /* CallExpression */ || node2.parent.kind === 211 /* NewExpression */) {
                        return spanInPreviousNode(node2);
                    }
                    if (node2.parent.kind === 214 /* ParenthesizedExpression */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }
                function spanInCloseParenToken(node2) {
                    switch (node2.parent.kind) {
                        case 215 /* FunctionExpression */:
                        case 259 /* FunctionDeclaration */:
                        case 216 /* ArrowFunction */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 173 /* Constructor */:
                        case 244 /* WhileStatement */:
                        case 243 /* DoStatement */:
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                        case 210 /* CallExpression */:
                        case 211 /* NewExpression */:
                        case 214 /* ParenthesizedExpression */:
                            return spanInPreviousNode(node2);
                        default:
                            return spanInNode(node2.parent);
                    }
                }
                function spanInColonToken(node2) {
                    if (isFunctionLike(node2.parent) || node2.parent.kind === 299 /* PropertyAssignment */ || node2.parent.kind === 166 /* Parameter */) {
                        return spanInPreviousNode(node2);
                    }
                    return spanInNode(node2.parent);
                }
                function spanInGreaterThanOrLessThanToken(node2) {
                    if (node2.parent.kind === 213 /* TypeAssertionExpression */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }
                function spanInWhileKeyword(node2) {
                    if (node2.parent.kind === 243 /* DoStatement */) {
                        return textSpanEndingAtNextToken(node2, node2.parent.expression);
                    }
                    return spanInNode(node2.parent);
                }
                function spanInOfKeyword(node2) {
                    if (node2.parent.kind === 247 /* ForOfStatement */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }
            }