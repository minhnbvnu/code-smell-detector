function getRangeToExtract2(sourceFile, span, invoked = true) {
            const { length: length2 } = span;
            if (length2 === 0 && !invoked) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractEmpty)] };
            }
            const cursorRequest = length2 === 0 && invoked;
            const startToken = findFirstNonJsxWhitespaceToken(sourceFile, span.start);
            const endToken = findTokenOnLeftOfPosition(sourceFile, textSpanEnd(span));
            const adjustedSpan = startToken && endToken && invoked ? getAdjustedSpanFromNodes(startToken, endToken, sourceFile) : span;
            const start = cursorRequest ? getExtractableParent(startToken) : getParentNodeInSpan(startToken, sourceFile, adjustedSpan);
            const end = cursorRequest ? start : getParentNodeInSpan(endToken, sourceFile, adjustedSpan);
            let rangeFacts = 0 /* None */;
            let thisNode;
            if (!start || !end) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractRange)] };
            }
            if (start.flags & 8388608 /* JSDoc */) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractJSDoc)] };
            }
            if (start.parent !== end.parent) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractRange)] };
            }
            if (start !== end) {
                if (!isBlockLike(start.parent)) {
                    return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractRange)] };
                }
                const statements = [];
                for (const statement of start.parent.statements) {
                    if (statement === start || statements.length) {
                        const errors2 = checkNode(statement);
                        if (errors2) {
                            return { errors: errors2 };
                        }
                        statements.push(statement);
                    }
                    if (statement === end) {
                        break;
                    }
                }
                if (!statements.length) {
                    return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractRange)] };
                }
                return { targetRange: { range: statements, facts: rangeFacts, thisNode } };
            }
            if (isReturnStatement(start) && !start.expression) {
                return { errors: [createFileDiagnostic(sourceFile, span.start, length2, Messages.cannotExtractRange)] };
            }
            const node = refineNode(start);
            const errors = checkRootNode(node) || checkNode(node);
            if (errors) {
                return { errors };
            }
            return { targetRange: { range: getStatementOrExpressionRange(node), facts: rangeFacts, thisNode } };
            function refineNode(node2) {
                if (isReturnStatement(node2)) {
                    if (node2.expression) {
                        return node2.expression;
                    }
                }
                else if (isVariableStatement(node2) || isVariableDeclarationList(node2)) {
                    const declarations = isVariableStatement(node2) ? node2.declarationList.declarations : node2.declarations;
                    let numInitializers = 0;
                    let lastInitializer;
                    for (const declaration of declarations) {
                        if (declaration.initializer) {
                            numInitializers++;
                            lastInitializer = declaration.initializer;
                        }
                    }
                    if (numInitializers === 1) {
                        return lastInitializer;
                    }
                }
                else if (isVariableDeclaration(node2)) {
                    if (node2.initializer) {
                        return node2.initializer;
                    }
                }
                return node2;
            }
            function checkRootNode(node2) {
                if (isIdentifier(isExpressionStatement(node2) ? node2.expression : node2)) {
                    return [createDiagnosticForNode(node2, Messages.cannotExtractIdentifier)];
                }
                return void 0;
            }
            function checkForStaticContext(nodeToCheck, containingClass) {
                let current = nodeToCheck;
                while (current !== containingClass) {
                    if (current.kind === 169 /* PropertyDeclaration */) {
                        if (isStatic(current)) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                        break;
                    }
                    else if (current.kind === 166 /* Parameter */) {
                        const ctorOrMethod = getContainingFunction(current);
                        if (ctorOrMethod.kind === 173 /* Constructor */) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                        break;
                    }
                    else if (current.kind === 171 /* MethodDeclaration */) {
                        if (isStatic(current)) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                    }
                    current = current.parent;
                }
            }
            function checkNode(nodeToCheck) {
                let PermittedJumps;
                ((PermittedJumps2) => {
                    PermittedJumps2[PermittedJumps2["None"] = 0] = "None";
                    PermittedJumps2[PermittedJumps2["Break"] = 1] = "Break";
                    PermittedJumps2[PermittedJumps2["Continue"] = 2] = "Continue";
                    PermittedJumps2[PermittedJumps2["Return"] = 4] = "Return";
                })(PermittedJumps || (PermittedJumps = {}));
                Debug.assert(nodeToCheck.pos <= nodeToCheck.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809 (1)");
                Debug.assert(!positionIsSynthesized(nodeToCheck.pos), "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809 (2)");
                if (!isStatement(nodeToCheck) && !(isExpressionNode(nodeToCheck) && isExtractableExpression(nodeToCheck)) && !isStringLiteralJsxAttribute(nodeToCheck)) {
                    return [createDiagnosticForNode(nodeToCheck, Messages.statementOrExpressionExpected)];
                }
                if (nodeToCheck.flags & 16777216 /* Ambient */) {
                    return [createDiagnosticForNode(nodeToCheck, Messages.cannotExtractAmbientBlock)];
                }
                const containingClass = getContainingClass(nodeToCheck);
                if (containingClass) {
                    checkForStaticContext(nodeToCheck, containingClass);
                }
                let errors2;
                let permittedJumps = 4 /* Return */;
                let seenLabels;
                visit(nodeToCheck);
                if (rangeFacts & 8 /* UsesThis */) {
                    const container = getThisContainer(nodeToCheck, 
                    /** includeArrowFunctions */
                    false, 
                    /*includeClassComputedPropertyName*/
                    false);
                    if (container.kind === 259 /* FunctionDeclaration */ || container.kind === 171 /* MethodDeclaration */ && container.parent.kind === 207 /* ObjectLiteralExpression */ || container.kind === 215 /* FunctionExpression */) {
                        rangeFacts |= 16 /* UsesThisInFunction */;
                    }
                }
                return errors2;
                function visit(node2) {
                    if (errors2) {
                        return true;
                    }
                    if (isDeclaration(node2)) {
                        const declaringNode = node2.kind === 257 /* VariableDeclaration */ ? node2.parent.parent : node2;
                        if (hasSyntacticModifier(declaringNode, 1 /* Export */)) {
                            (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractExportedEntity));
                            return true;
                        }
                    }
                    switch (node2.kind) {
                        case 269 /* ImportDeclaration */:
                            (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractImport));
                            return true;
                        case 274 /* ExportAssignment */:
                            (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractExportedEntity));
                            return true;
                        case 106 /* SuperKeyword */:
                            if (node2.parent.kind === 210 /* CallExpression */) {
                                const containingClass2 = getContainingClass(node2);
                                if (containingClass2 === void 0 || containingClass2.pos < span.start || containingClass2.end >= span.start + span.length) {
                                    (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractSuper));
                                    return true;
                                }
                            }
                            else {
                                rangeFacts |= 8 /* UsesThis */;
                                thisNode = node2;
                            }
                            break;
                        case 216 /* ArrowFunction */:
                            forEachChild(node2, function check(n) {
                                if (isThis(n)) {
                                    rangeFacts |= 8 /* UsesThis */;
                                    thisNode = node2;
                                }
                                else if (isClassLike(n) || isFunctionLike(n) && !isArrowFunction(n)) {
                                    return false;
                                }
                                else {
                                    forEachChild(n, check);
                                }
                            });
                        case 260 /* ClassDeclaration */:
                        case 259 /* FunctionDeclaration */:
                            if (isSourceFile(node2.parent) && node2.parent.externalModuleIndicator === void 0) {
                                (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.functionWillNotBeVisibleInTheNewScope));
                            }
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                        case 171 /* MethodDeclaration */:
                        case 173 /* Constructor */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            return false;
                    }
                    const savedPermittedJumps = permittedJumps;
                    switch (node2.kind) {
                        case 242 /* IfStatement */:
                            permittedJumps &= ~4 /* Return */;
                            break;
                        case 255 /* TryStatement */:
                            permittedJumps = 0 /* None */;
                            break;
                        case 238 /* Block */:
                            if (node2.parent && node2.parent.kind === 255 /* TryStatement */ && node2.parent.finallyBlock === node2) {
                                permittedJumps = 4 /* Return */;
                            }
                            break;
                        case 293 /* DefaultClause */:
                        case 292 /* CaseClause */:
                            permittedJumps |= 1 /* Break */;
                            break;
                        default:
                            if (isIterationStatement(node2, 
                            /*lookInLabeledStatements*/
                            false)) {
                                permittedJumps |= 1 /* Break */ | 2 /* Continue */;
                            }
                            break;
                    }
                    switch (node2.kind) {
                        case 194 /* ThisType */:
                        case 108 /* ThisKeyword */:
                            rangeFacts |= 8 /* UsesThis */;
                            thisNode = node2;
                            break;
                        case 253 /* LabeledStatement */: {
                            const label = node2.label;
                            (seenLabels || (seenLabels = [])).push(label.escapedText);
                            forEachChild(node2, visit);
                            seenLabels.pop();
                            break;
                        }
                        case 249 /* BreakStatement */:
                        case 248 /* ContinueStatement */: {
                            const label = node2.label;
                            if (label) {
                                if (!contains(seenLabels, label.escapedText)) {
                                    (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange));
                                }
                            }
                            else {
                                if (!(permittedJumps & (node2.kind === 249 /* BreakStatement */ ? 1 /* Break */ : 2 /* Continue */))) {
                                    (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements));
                                }
                            }
                            break;
                        }
                        case 220 /* AwaitExpression */:
                            rangeFacts |= 4 /* IsAsyncFunction */;
                            break;
                        case 226 /* YieldExpression */:
                            rangeFacts |= 2 /* IsGenerator */;
                            break;
                        case 250 /* ReturnStatement */:
                            if (permittedJumps & 4 /* Return */) {
                                rangeFacts |= 1 /* HasReturn */;
                            }
                            else {
                                (errors2 || (errors2 = [])).push(createDiagnosticForNode(node2, Messages.cannotExtractRangeContainingConditionalReturnStatement));
                            }
                            break;
                        default:
                            forEachChild(node2, visit);
                            break;
                    }
                    permittedJumps = savedPermittedJumps;
                }
            }
        }