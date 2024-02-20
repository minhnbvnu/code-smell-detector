function transformNodes(resolver, host, factory2, options, nodes, transformers, allowDtsFiles) {
            var _a2, _b;
            const enabledSyntaxKindFeatures = new Array(361 /* Count */);
            let lexicalEnvironmentVariableDeclarations;
            let lexicalEnvironmentFunctionDeclarations;
            let lexicalEnvironmentStatements;
            let lexicalEnvironmentFlags = 0 /* None */;
            let lexicalEnvironmentVariableDeclarationsStack = [];
            let lexicalEnvironmentFunctionDeclarationsStack = [];
            let lexicalEnvironmentStatementsStack = [];
            let lexicalEnvironmentFlagsStack = [];
            let lexicalEnvironmentStackOffset = 0;
            let lexicalEnvironmentSuspended = false;
            let blockScopedVariableDeclarationsStack = [];
            let blockScopeStackOffset = 0;
            let blockScopedVariableDeclarations;
            let emitHelpers;
            let onSubstituteNode = noEmitSubstitution;
            let onEmitNode = noEmitNotification;
            let state = 0 /* Uninitialized */;
            const diagnostics = [];
            const context = {
                factory: factory2,
                getCompilerOptions: () => options,
                getEmitResolver: () => resolver,
                // TODO: GH#18217
                getEmitHost: () => host,
                // TODO: GH#18217
                getEmitHelperFactory: memoize(() => createEmitHelperFactory(context)),
                startLexicalEnvironment,
                suspendLexicalEnvironment,
                resumeLexicalEnvironment,
                endLexicalEnvironment,
                setLexicalEnvironmentFlags,
                getLexicalEnvironmentFlags,
                hoistVariableDeclaration,
                hoistFunctionDeclaration,
                addInitializationStatement,
                startBlockScope,
                endBlockScope,
                addBlockScopedVariable,
                requestEmitHelper,
                readEmitHelpers,
                enableSubstitution,
                enableEmitNotification,
                isSubstitutionEnabled,
                isEmitNotificationEnabled,
                get onSubstituteNode() {
                    return onSubstituteNode;
                },
                set onSubstituteNode(value) {
                    Debug.assert(state < 1 /* Initialized */, "Cannot modify transformation hooks after initialization has completed.");
                    Debug.assert(value !== void 0, "Value must not be 'undefined'");
                    onSubstituteNode = value;
                },
                get onEmitNode() {
                    return onEmitNode;
                },
                set onEmitNode(value) {
                    Debug.assert(state < 1 /* Initialized */, "Cannot modify transformation hooks after initialization has completed.");
                    Debug.assert(value !== void 0, "Value must not be 'undefined'");
                    onEmitNode = value;
                },
                addDiagnostic(diag2) {
                    diagnostics.push(diag2);
                }
            };
            for (const node of nodes) {
                disposeEmitNodes(getSourceFileOfNode(getParseTreeNode(node)));
            }
            mark("beforeTransform");
            const transformersWithContext = transformers.map((t) => t(context));
            const transformation = (node) => {
                for (const transform2 of transformersWithContext) {
                    node = transform2(node);
                }
                return node;
            };
            state = 1 /* Initialized */;
            const transformed = [];
            for (const node of nodes) {
                (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Emit, "transformNodes", node.kind === 308 /* SourceFile */ ? { path: node.path } : { kind: node.kind, pos: node.pos, end: node.end });
                transformed.push((allowDtsFiles ? transformation : transformRoot)(node));
                (_b = tracing) == null ? void 0 : _b.pop();
            }
            state = 2 /* Completed */;
            mark("afterTransform");
            measure("transformTime", "beforeTransform", "afterTransform");
            return {
                transformed,
                substituteNode,
                emitNodeWithNotification,
                isEmitNotificationEnabled,
                dispose,
                diagnostics
            };
            function transformRoot(node) {
                return node && (!isSourceFile(node) || !node.isDeclarationFile) ? transformation(node) : node;
            }
            function enableSubstitution(kind) {
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                enabledSyntaxKindFeatures[kind] |= 1 /* Substitution */;
            }
            function isSubstitutionEnabled(node) {
                return (enabledSyntaxKindFeatures[node.kind] & 1 /* Substitution */) !== 0 && (getEmitFlags(node) & 8 /* NoSubstitution */) === 0;
            }
            function substituteNode(hint, node) {
                Debug.assert(state < 3 /* Disposed */, "Cannot substitute a node after the result is disposed.");
                return node && isSubstitutionEnabled(node) && onSubstituteNode(hint, node) || node;
            }
            function enableEmitNotification(kind) {
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                enabledSyntaxKindFeatures[kind] |= 2 /* EmitNotifications */;
            }
            function isEmitNotificationEnabled(node) {
                return (enabledSyntaxKindFeatures[node.kind] & 2 /* EmitNotifications */) !== 0 || (getEmitFlags(node) & 4 /* AdviseOnEmitNode */) !== 0;
            }
            function emitNodeWithNotification(hint, node, emitCallback) {
                Debug.assert(state < 3 /* Disposed */, "Cannot invoke TransformationResult callbacks after the result is disposed.");
                if (node) {
                    if (isEmitNotificationEnabled(node)) {
                        onEmitNode(hint, node, emitCallback);
                    }
                    else {
                        emitCallback(hint, node);
                    }
                }
            }
            function hoistVariableDeclaration(name) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                const decl = setEmitFlags(factory2.createVariableDeclaration(name), 128 /* NoNestedSourceMaps */);
                if (!lexicalEnvironmentVariableDeclarations) {
                    lexicalEnvironmentVariableDeclarations = [decl];
                }
                else {
                    lexicalEnvironmentVariableDeclarations.push(decl);
                }
                if (lexicalEnvironmentFlags & 1 /* InParameters */) {
                    lexicalEnvironmentFlags |= 2 /* VariablesHoistedInParameters */;
                }
            }
            function hoistFunctionDeclaration(func) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                setEmitFlags(func, 2097152 /* CustomPrologue */);
                if (!lexicalEnvironmentFunctionDeclarations) {
                    lexicalEnvironmentFunctionDeclarations = [func];
                }
                else {
                    lexicalEnvironmentFunctionDeclarations.push(func);
                }
            }
            function addInitializationStatement(node) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                setEmitFlags(node, 2097152 /* CustomPrologue */);
                if (!lexicalEnvironmentStatements) {
                    lexicalEnvironmentStatements = [node];
                }
                else {
                    lexicalEnvironmentStatements.push(node);
                }
            }
            function startLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");
                lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentVariableDeclarations;
                lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFunctionDeclarations;
                lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentStatements;
                lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFlags;
                lexicalEnvironmentStackOffset++;
                lexicalEnvironmentVariableDeclarations = void 0;
                lexicalEnvironmentFunctionDeclarations = void 0;
                lexicalEnvironmentStatements = void 0;
                lexicalEnvironmentFlags = 0 /* None */;
            }
            function suspendLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is already suspended.");
                lexicalEnvironmentSuspended = true;
            }
            function resumeLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(lexicalEnvironmentSuspended, "Lexical environment is not suspended.");
                lexicalEnvironmentSuspended = false;
            }
            function endLexicalEnvironment() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the lexical environment during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the lexical environment after transformation has completed.");
                Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");
                let statements;
                if (lexicalEnvironmentVariableDeclarations || lexicalEnvironmentFunctionDeclarations || lexicalEnvironmentStatements) {
                    if (lexicalEnvironmentFunctionDeclarations) {
                        statements = [...lexicalEnvironmentFunctionDeclarations];
                    }
                    if (lexicalEnvironmentVariableDeclarations) {
                        const statement = factory2.createVariableStatement(
                        /*modifiers*/
                        void 0, factory2.createVariableDeclarationList(lexicalEnvironmentVariableDeclarations));
                        setEmitFlags(statement, 2097152 /* CustomPrologue */);
                        if (!statements) {
                            statements = [statement];
                        }
                        else {
                            statements.push(statement);
                        }
                    }
                    if (lexicalEnvironmentStatements) {
                        if (!statements) {
                            statements = [...lexicalEnvironmentStatements];
                        }
                        else {
                            statements = [...statements, ...lexicalEnvironmentStatements];
                        }
                    }
                }
                lexicalEnvironmentStackOffset--;
                lexicalEnvironmentVariableDeclarations = lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentFunctionDeclarations = lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentStatements = lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset];
                lexicalEnvironmentFlags = lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset];
                if (lexicalEnvironmentStackOffset === 0) {
                    lexicalEnvironmentVariableDeclarationsStack = [];
                    lexicalEnvironmentFunctionDeclarationsStack = [];
                    lexicalEnvironmentStatementsStack = [];
                    lexicalEnvironmentFlagsStack = [];
                }
                return statements;
            }
            function setLexicalEnvironmentFlags(flags, value) {
                lexicalEnvironmentFlags = value ? lexicalEnvironmentFlags | flags : lexicalEnvironmentFlags & ~flags;
            }
            function getLexicalEnvironmentFlags() {
                return lexicalEnvironmentFlags;
            }
            function startBlockScope() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot start a block scope during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot start a block scope after transformation has completed.");
                blockScopedVariableDeclarationsStack[blockScopeStackOffset] = blockScopedVariableDeclarations;
                blockScopeStackOffset++;
                blockScopedVariableDeclarations = void 0;
            }
            function endBlockScope() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot end a block scope during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot end a block scope after transformation has completed.");
                const statements = some(blockScopedVariableDeclarations) ? [
                    factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(blockScopedVariableDeclarations.map((identifier) => factory2.createVariableDeclaration(identifier)), 1 /* Let */))
                ] : void 0;
                blockScopeStackOffset--;
                blockScopedVariableDeclarations = blockScopedVariableDeclarationsStack[blockScopeStackOffset];
                if (blockScopeStackOffset === 0) {
                    blockScopedVariableDeclarationsStack = [];
                }
                return statements;
            }
            function addBlockScopedVariable(name) {
                Debug.assert(blockScopeStackOffset > 0, "Cannot add a block scoped variable outside of an iteration body.");
                (blockScopedVariableDeclarations || (blockScopedVariableDeclarations = [])).push(name);
            }
            function requestEmitHelper(helper) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the transformation context during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
                if (helper.dependencies) {
                    for (const h of helper.dependencies) {
                        requestEmitHelper(h);
                    }
                }
                emitHelpers = append(emitHelpers, helper);
            }
            function readEmitHelpers() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the transformation context during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                const helpers = emitHelpers;
                emitHelpers = void 0;
                return helpers;
            }
            function dispose() {
                if (state < 3 /* Disposed */) {
                    for (const node of nodes) {
                        disposeEmitNodes(getSourceFileOfNode(getParseTreeNode(node)));
                    }
                    lexicalEnvironmentVariableDeclarations = void 0;
                    lexicalEnvironmentVariableDeclarationsStack = void 0;
                    lexicalEnvironmentFunctionDeclarations = void 0;
                    lexicalEnvironmentFunctionDeclarationsStack = void 0;
                    onSubstituteNode = void 0;
                    onEmitNode = void 0;
                    emitHelpers = void 0;
                    state = 3 /* Disposed */;
                }
            }
        }