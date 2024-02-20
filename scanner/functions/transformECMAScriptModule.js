function transformECMAScriptModule(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers } = context;
            const host = context.getEmitHost();
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const previousOnEmitNode = context.onEmitNode;
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            context.enableEmitNotification(308 /* SourceFile */);
            context.enableSubstitution(79 /* Identifier */);
            let helperNameSubstitutions;
            let currentSourceFile;
            let importRequireStatements;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                if (isExternalModule(node) || getIsolatedModules(compilerOptions)) {
                    currentSourceFile = node;
                    importRequireStatements = void 0;
                    let result = updateExternalModule(node);
                    currentSourceFile = void 0;
                    if (importRequireStatements) {
                        result = factory2.updateSourceFile(result, setTextRange(factory2.createNodeArray(insertStatementsAfterCustomPrologue(result.statements.slice(), importRequireStatements)), result.statements));
                    }
                    if (!isExternalModule(node) || some(result.statements, isExternalModuleIndicator)) {
                        return result;
                    }
                    return factory2.updateSourceFile(result, setTextRange(factory2.createNodeArray([...result.statements, createEmptyExports(factory2)]), result.statements));
                }
                return node;
            }
            function updateExternalModule(node) {
                const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(factory2, emitHelpers(), node, compilerOptions);
                if (externalHelpersImportDeclaration) {
                    const statements = [];
                    const statementOffset = factory2.copyPrologue(node.statements, statements);
                    append(statements, externalHelpersImportDeclaration);
                    addRange(statements, visitNodes2(node.statements, visitor, isStatement, statementOffset));
                    return factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray(statements), node.statements));
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }
            function visitor(node) {
                switch (node.kind) {
                    case 268 /* ImportEqualsDeclaration */:
                        return getEmitModuleKind(compilerOptions) >= 100 /* Node16 */ ? visitImportEqualsDeclaration(node) : void 0;
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 275 /* ExportDeclaration */:
                        const exportDecl = node;
                        return visitExportDeclaration(exportDecl);
                }
                return node;
            }
            function createRequireCall2(importNode) {
                const moduleName = getExternalModuleNameLiteral(factory2, importNode, Debug.checkDefined(currentSourceFile), host, resolver, compilerOptions);
                const args = [];
                if (moduleName) {
                    args.push(moduleName);
                }
                if (!importRequireStatements) {
                    const createRequireName = factory2.createUniqueName("_createRequire", 16 /* Optimistic */ | 32 /* FileLevel */);
                    const importStatement = factory2.createImportDeclaration(
                    /*modifiers*/
                    void 0, factory2.createImportClause(
                    /*isTypeOnly*/
                    false, 
                    /*name*/
                    void 0, factory2.createNamedImports([
                        factory2.createImportSpecifier(
                        /*isTypeOnly*/
                        false, factory2.createIdentifier("createRequire"), createRequireName)
                    ])), factory2.createStringLiteral("module"));
                    const requireHelperName = factory2.createUniqueName("__require", 16 /* Optimistic */ | 32 /* FileLevel */);
                    const requireStatement = factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(requireHelperName, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createCallExpression(factory2.cloneNode(createRequireName), 
                        /*typeArguments*/
                        void 0, [
                            factory2.createPropertyAccessExpression(factory2.createMetaProperty(100 /* ImportKeyword */, factory2.createIdentifier("meta")), factory2.createIdentifier("url"))
                        ]))
                    ], 
                    /*flags*/
                    languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */));
                    importRequireStatements = [importStatement, requireStatement];
                }
                const name = importRequireStatements[1].declarationList.declarations[0].name;
                Debug.assertNode(name, isIdentifier);
                return factory2.createCallExpression(factory2.cloneNode(name), 
                /*typeArguments*/
                void 0, args);
            }
            function visitImportEqualsDeclaration(node) {
                Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");
                let statements;
                statements = append(statements, setOriginalNode(setTextRange(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.cloneNode(node.name), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, createRequireCall2(node))
                ], 
                /*flags*/
                languageVersion >= 2 /* ES2015 */ ? 2 /* Const */ : 0 /* None */)), node), node));
                statements = appendExportsOfImportEqualsDeclaration(statements, node);
                return singleOrMany(statements);
            }
            function appendExportsOfImportEqualsDeclaration(statements, node) {
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    statements = append(statements, factory2.createExportDeclaration(
                    /*modifiers*/
                    void 0, node.isTypeOnly, factory2.createNamedExports([factory2.createExportSpecifier(
                        /*isTypeOnly*/
                        false, 
                        /*propertyName*/
                        void 0, idText(node.name))])));
                }
                return statements;
            }
            function visitExportAssignment(node) {
                return node.isExportEquals ? void 0 : node;
            }
            function visitExportDeclaration(node) {
                if (compilerOptions.module !== void 0 && compilerOptions.module > 5 /* ES2015 */) {
                    return node;
                }
                if (!node.exportClause || !isNamespaceExport(node.exportClause) || !node.moduleSpecifier) {
                    return node;
                }
                const oldIdentifier = node.exportClause.name;
                const synthName = factory2.getGeneratedNameForNode(oldIdentifier);
                const importDecl = factory2.createImportDeclaration(
                /*modifiers*/
                void 0, factory2.createImportClause(
                /*isTypeOnly*/
                false, 
                /*name*/
                void 0, factory2.createNamespaceImport(synthName)), node.moduleSpecifier, node.assertClause);
                setOriginalNode(importDecl, node.exportClause);
                const exportDecl = isExportNamespaceAsDefaultDeclaration(node) ? factory2.createExportDefault(synthName) : factory2.createExportDeclaration(
                /*modifiers*/
                void 0, 
                /*isTypeOnly*/
                false, factory2.createNamedExports([factory2.createExportSpecifier(
                    /*isTypeOnly*/
                    false, synthName, oldIdentifier)]));
                setOriginalNode(exportDecl, node);
                return [importDecl, exportDecl];
            }
            function onEmitNode(hint, node, emitCallback) {
                if (isSourceFile(node)) {
                    if ((isExternalModule(node) || getIsolatedModules(compilerOptions)) && compilerOptions.importHelpers) {
                        helperNameSubstitutions = /* @__PURE__ */ new Map();
                    }
                    previousOnEmitNode(hint, node, emitCallback);
                    helperNameSubstitutions = void 0;
                }
                else {
                    previousOnEmitNode(hint, node, emitCallback);
                }
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (helperNameSubstitutions && isIdentifier(node) && getEmitFlags(node) & 8192 /* HelperName */) {
                    return substituteHelperName(node);
                }
                return node;
            }
            function substituteHelperName(node) {
                const name = idText(node);
                let substitution = helperNameSubstitutions.get(name);
                if (!substitution) {
                    helperNameSubstitutions.set(name, substitution = factory2.createUniqueName(name, 16 /* Optimistic */ | 32 /* FileLevel */));
                }
                return substitution;
            }
        }