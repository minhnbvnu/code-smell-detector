function transformAsyncFunctionBody(node) {
                resumeLexicalEnvironment();
                const original = getOriginalNode(node, isFunctionLike);
                const nodeType = original.type;
                const promiseConstructor = languageVersion < 2 /* ES2015 */ ? getPromiseConstructor(nodeType) : void 0;
                const isArrowFunction2 = node.kind === 216 /* ArrowFunction */;
                const hasLexicalArguments = (resolver.getNodeCheckFlags(node) & 512 /* CaptureArguments */) !== 0;
                const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
                enclosingFunctionParameterNames = /* @__PURE__ */ new Set();
                for (const parameter of node.parameters) {
                    recordDeclarationName(parameter, enclosingFunctionParameterNames);
                }
                const savedCapturedSuperProperties = capturedSuperProperties;
                const savedHasSuperElementAccess = hasSuperElementAccess;
                if (!isArrowFunction2) {
                    capturedSuperProperties = /* @__PURE__ */ new Set();
                    hasSuperElementAccess = false;
                }
                let result;
                if (!isArrowFunction2) {
                    const statements = [];
                    const statementOffset = factory2.copyPrologue(node.body.statements, statements, 
                    /*ensureUseStrict*/
                    false, visitor);
                    statements.push(factory2.createReturnStatement(emitHelpers().createAwaiterHelper(inHasLexicalThisContext(), hasLexicalArguments, promiseConstructor, transformAsyncFunctionBodyWorker(node.body, statementOffset))));
                    insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                    const emitSuperHelpers = languageVersion >= 2 /* ES2015 */ && resolver.getNodeCheckFlags(node) & (256 /* MethodWithSuperPropertyAssignmentInAsync */ | 128 /* MethodWithSuperPropertyAccessInAsync */);
                    if (emitSuperHelpers) {
                        enableSubstitutionForAsyncMethodsWithSuper();
                        if (capturedSuperProperties.size) {
                            const variableStatement = createSuperAccessVariableStatement(factory2, resolver, node, capturedSuperProperties);
                            substitutedSuperAccessors[getNodeId(variableStatement)] = true;
                            insertStatementsAfterStandardPrologue(statements, [variableStatement]);
                        }
                    }
                    const block = factory2.createBlock(statements, 
                    /*multiLine*/
                    true);
                    setTextRange(block, node.body);
                    if (emitSuperHelpers && hasSuperElementAccess) {
                        if (resolver.getNodeCheckFlags(node) & 256 /* MethodWithSuperPropertyAssignmentInAsync */) {
                            addEmitHelper(block, advancedAsyncSuperHelper);
                        }
                        else if (resolver.getNodeCheckFlags(node) & 128 /* MethodWithSuperPropertyAccessInAsync */) {
                            addEmitHelper(block, asyncSuperHelper);
                        }
                    }
                    result = block;
                }
                else {
                    const expression = emitHelpers().createAwaiterHelper(inHasLexicalThisContext(), hasLexicalArguments, promiseConstructor, transformAsyncFunctionBodyWorker(node.body));
                    const declarations = endLexicalEnvironment();
                    if (some(declarations)) {
                        const block = factory2.converters.convertToFunctionBlock(expression);
                        result = factory2.updateBlock(block, setTextRange(factory2.createNodeArray(concatenate(declarations, block.statements)), block.statements));
                    }
                    else {
                        result = expression;
                    }
                }
                enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
                if (!isArrowFunction2) {
                    capturedSuperProperties = savedCapturedSuperProperties;
                    hasSuperElementAccess = savedHasSuperElementAccess;
                }
                return result;
            }