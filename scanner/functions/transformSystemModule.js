function transformSystemModule(context) {
            const { factory: factory2, startLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const compilerOptions = context.getCompilerOptions();
            const resolver = context.getEmitResolver();
            const host = context.getEmitHost();
            const previousOnSubstituteNode = context.onSubstituteNode;
            const previousOnEmitNode = context.onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.enableSubstitution(79 /* Identifier */);
            context.enableSubstitution(300 /* ShorthandPropertyAssignment */);
            context.enableSubstitution(223 /* BinaryExpression */);
            context.enableSubstitution(233 /* MetaProperty */);
            context.enableEmitNotification(308 /* SourceFile */);
            const moduleInfoMap = [];
            const deferredExports = [];
            const exportFunctionsMap = [];
            const noSubstitutionMap = [];
            const contextObjectMap = [];
            let currentSourceFile;
            let moduleInfo;
            let exportFunction;
            let contextObject;
            let hoistedStatements;
            let enclosingBlockScopedContainer;
            let noSubstitution;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile || !(isEffectiveExternalModule(node, compilerOptions) || node.transformFlags & 8388608 /* ContainsDynamicImport */)) {
                    return node;
                }
                const id = getOriginalNodeId(node);
                currentSourceFile = node;
                enclosingBlockScopedContainer = node;
                moduleInfo = moduleInfoMap[id] = collectExternalModuleInfo(context, node, resolver, compilerOptions);
                exportFunction = factory2.createUniqueName("exports");
                exportFunctionsMap[id] = exportFunction;
                contextObject = contextObjectMap[id] = factory2.createUniqueName("context");
                const dependencyGroups = collectDependencyGroups(moduleInfo.externalImports);
                const moduleBodyBlock = createSystemModuleBody(node, dependencyGroups);
                const moduleBodyFunction = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, [
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, exportFunction),
                    factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, contextObject)
                ], 
                /*type*/
                void 0, moduleBodyBlock);
                const moduleName = tryGetModuleNameFromFile(factory2, node, host, compilerOptions);
                const dependencies = factory2.createArrayLiteralExpression(map(dependencyGroups, (dependencyGroup) => dependencyGroup.name));
                const updated = setEmitFlags(factory2.updateSourceFile(node, setTextRange(factory2.createNodeArray([
                    factory2.createExpressionStatement(factory2.createCallExpression(factory2.createPropertyAccessExpression(factory2.createIdentifier("System"), "register"), 
                    /*typeArguments*/
                    void 0, moduleName ? [moduleName, dependencies, moduleBodyFunction] : [dependencies, moduleBodyFunction]))
                ]), node.statements)), 2048 /* NoTrailingComments */);
                if (!outFile(compilerOptions)) {
                    moveEmitHelpers(updated, moduleBodyBlock, (helper) => !helper.scoped);
                }
                if (noSubstitution) {
                    noSubstitutionMap[id] = noSubstitution;
                    noSubstitution = void 0;
                }
                currentSourceFile = void 0;
                moduleInfo = void 0;
                exportFunction = void 0;
                contextObject = void 0;
                hoistedStatements = void 0;
                enclosingBlockScopedContainer = void 0;
                return updated;
            }
            function collectDependencyGroups(externalImports) {
                const groupIndices = /* @__PURE__ */ new Map();
                const dependencyGroups = [];
                for (const externalImport of externalImports) {
                    const externalModuleName = getExternalModuleNameLiteral(factory2, externalImport, currentSourceFile, host, resolver, compilerOptions);
                    if (externalModuleName) {
                        const text = externalModuleName.text;
                        const groupIndex = groupIndices.get(text);
                        if (groupIndex !== void 0) {
                            dependencyGroups[groupIndex].externalImports.push(externalImport);
                        }
                        else {
                            groupIndices.set(text, dependencyGroups.length);
                            dependencyGroups.push({
                                name: externalModuleName,
                                externalImports: [externalImport]
                            });
                        }
                    }
                }
                return dependencyGroups;
            }
            function createSystemModuleBody(node, dependencyGroups) {
                const statements = [];
                startLexicalEnvironment();
                const ensureUseStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") || !compilerOptions.noImplicitUseStrict && isExternalModule(currentSourceFile);
                const statementOffset = factory2.copyPrologue(node.statements, statements, ensureUseStrict, topLevelVisitor);
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration("__moduleName", 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createLogicalAnd(contextObject, factory2.createPropertyAccessExpression(contextObject, "id")))
                ])));
                visitNode(moduleInfo.externalHelpersImportDeclaration, topLevelVisitor, isStatement);
                const executeStatements = visitNodes2(node.statements, topLevelVisitor, isStatement, statementOffset);
                addRange(statements, hoistedStatements);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                const exportStarFunction = addExportStarIfNeeded(statements);
                const modifiers = node.transformFlags & 2097152 /* ContainsAwait */ ? factory2.createModifiersFromModifierFlags(512 /* Async */) : void 0;
                const moduleObject = factory2.createObjectLiteralExpression([
                    factory2.createPropertyAssignment("setters", createSettersArray(exportStarFunction, dependencyGroups)),
                    factory2.createPropertyAssignment("execute", factory2.createFunctionExpression(modifiers, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, 
                    /*parameters*/
                    [], 
                    /*type*/
                    void 0, factory2.createBlock(executeStatements, 
                    /*multiLine*/
                    true)))
                ], 
                /*multiLine*/
                true);
                statements.push(factory2.createReturnStatement(moduleObject));
                return factory2.createBlock(statements, 
                /*multiLine*/
                true);
            }
            function addExportStarIfNeeded(statements) {
                if (!moduleInfo.hasExportStarsToExportValues) {
                    return;
                }
                if (!moduleInfo.exportedNames && moduleInfo.exportSpecifiers.size === 0) {
                    let hasExportDeclarationWithExportClause = false;
                    for (const externalImport of moduleInfo.externalImports) {
                        if (externalImport.kind === 275 /* ExportDeclaration */ && externalImport.exportClause) {
                            hasExportDeclarationWithExportClause = true;
                            break;
                        }
                    }
                    if (!hasExportDeclarationWithExportClause) {
                        const exportStarFunction2 = createExportStarFunction(
                        /*localNames*/
                        void 0);
                        statements.push(exportStarFunction2);
                        return exportStarFunction2.name;
                    }
                }
                const exportedNames = [];
                if (moduleInfo.exportedNames) {
                    for (const exportedLocalName of moduleInfo.exportedNames) {
                        if (exportedLocalName.escapedText === "default") {
                            continue;
                        }
                        exportedNames.push(factory2.createPropertyAssignment(factory2.createStringLiteralFromNode(exportedLocalName), factory2.createTrue()));
                    }
                }
                const exportedNamesStorageRef = factory2.createUniqueName("exportedNames");
                statements.push(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(exportedNamesStorageRef, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createObjectLiteralExpression(exportedNames, 
                    /*multiline*/
                    true))
                ])));
                const exportStarFunction = createExportStarFunction(exportedNamesStorageRef);
                statements.push(exportStarFunction);
                return exportStarFunction.name;
            }
            function createExportStarFunction(localNames) {
                const exportStarFunction = factory2.createUniqueName("exportStar");
                const m = factory2.createIdentifier("m");
                const n = factory2.createIdentifier("n");
                const exports = factory2.createIdentifier("exports");
                let condition = factory2.createStrictInequality(n, factory2.createStringLiteral("default"));
                if (localNames) {
                    condition = factory2.createLogicalAnd(condition, factory2.createLogicalNot(factory2.createCallExpression(factory2.createPropertyAccessExpression(localNames, "hasOwnProperty"), 
                    /*typeArguments*/
                    void 0, [n])));
                }
                return factory2.createFunctionDeclaration(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, exportStarFunction, 
                /*typeParameters*/
                void 0, [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, m)], 
                /*type*/
                void 0, factory2.createBlock([
                    factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(exports, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, factory2.createObjectLiteralExpression([]))
                    ])),
                    factory2.createForInStatement(factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(n)
                    ]), m, factory2.createBlock([
                        setEmitFlags(factory2.createIfStatement(condition, factory2.createExpressionStatement(factory2.createAssignment(factory2.createElementAccessExpression(exports, n), factory2.createElementAccessExpression(m, n)))), 1 /* SingleLine */)
                    ])),
                    factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                    /*typeArguments*/
                    void 0, [exports]))
                ], 
                /*multiline*/
                true));
            }
            function createSettersArray(exportStarFunction, dependencyGroups) {
                const setters = [];
                for (const group2 of dependencyGroups) {
                    const localName = forEach(group2.externalImports, (i) => getLocalNameForExternalImport(factory2, i, currentSourceFile));
                    const parameterName = localName ? factory2.getGeneratedNameForNode(localName) : factory2.createUniqueName("");
                    const statements = [];
                    for (const entry of group2.externalImports) {
                        const importVariableName = getLocalNameForExternalImport(factory2, entry, currentSourceFile);
                        switch (entry.kind) {
                            case 269 /* ImportDeclaration */:
                                if (!entry.importClause) {
                                    break;
                                }
                            case 268 /* ImportEqualsDeclaration */:
                                Debug.assert(importVariableName !== void 0);
                                statements.push(factory2.createExpressionStatement(factory2.createAssignment(importVariableName, parameterName)));
                                if (hasSyntacticModifier(entry, 1 /* Export */)) {
                                    statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                    /*typeArguments*/
                                    void 0, [
                                        factory2.createStringLiteral(idText(importVariableName)),
                                        parameterName
                                    ])));
                                }
                                break;
                            case 275 /* ExportDeclaration */:
                                Debug.assert(importVariableName !== void 0);
                                if (entry.exportClause) {
                                    if (isNamedExports(entry.exportClause)) {
                                        const properties = [];
                                        for (const e of entry.exportClause.elements) {
                                            properties.push(factory2.createPropertyAssignment(factory2.createStringLiteral(idText(e.name)), factory2.createElementAccessExpression(parameterName, factory2.createStringLiteral(idText(e.propertyName || e.name)))));
                                        }
                                        statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                        /*typeArguments*/
                                        void 0, [factory2.createObjectLiteralExpression(properties, 
                                            /*multiline*/
                                            true)])));
                                    }
                                    else {
                                        statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportFunction, 
                                        /*typeArguments*/
                                        void 0, [
                                            factory2.createStringLiteral(idText(entry.exportClause.name)),
                                            parameterName
                                        ])));
                                    }
                                }
                                else {
                                    statements.push(factory2.createExpressionStatement(factory2.createCallExpression(exportStarFunction, 
                                    /*typeArguments*/
                                    void 0, [parameterName])));
                                }
                                break;
                        }
                    }
                    setters.push(factory2.createFunctionExpression(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, 
                    /*name*/
                    void 0, 
                    /*typeParameters*/
                    void 0, [factory2.createParameterDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*dotDotDotToken*/
                        void 0, parameterName)], 
                    /*type*/
                    void 0, factory2.createBlock(statements, 
                    /*multiLine*/
                    true)));
                }
                return factory2.createArrayLiteralExpression(setters, 
                /*multiLine*/
                true);
            }
            function topLevelVisitor(node) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        return visitImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 275 /* ExportDeclaration */:
                        return visitExportDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    default:
                        return topLevelNestedVisitor(node);
                }
            }
            function visitImportDeclaration(node) {
                let statements;
                if (node.importClause) {
                    hoistVariableDeclaration(getLocalNameForExternalImport(factory2, node, currentSourceFile));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfImportDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfImportDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitExportDeclaration(node) {
                Debug.assertIsDefined(node);
                return void 0;
            }
            function visitImportEqualsDeclaration(node) {
                Debug.assert(isExternalModuleImportEqualsDeclaration(node), "import= for internal module references should be handled in an earlier transformer.");
                let statements;
                hoistVariableDeclaration(getLocalNameForExternalImport(factory2, node, currentSourceFile));
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfImportEqualsDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfImportEqualsDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitExportAssignment(node) {
                if (node.isExportEquals) {
                    return void 0;
                }
                const expression = visitNode(node.expression, visitor, isExpression);
                const original = node.original;
                if (original && hasAssociatedEndOfDeclarationMarker(original)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportStatement(deferredExports[id], factory2.createIdentifier("default"), expression, 
                    /*allowComments*/
                    true);
                }
                else {
                    return createExportStatement(factory2.createIdentifier("default"), expression, 
                    /*allowComments*/
                    true);
                }
            }
            function visitFunctionDeclaration(node) {
                if (hasSyntacticModifier(node, 1 /* Export */)) {
                    hoistedStatements = append(hoistedStatements, factory2.updateFunctionDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifierLike), node.asteriskToken, factory2.getDeclarationName(node, 
                    /*allowComments*/
                    true, 
                    /*allowSourceMaps*/
                    true), 
                    /*typeParameters*/
                    void 0, visitNodes2(node.parameters, visitor, isParameter), 
                    /*type*/
                    void 0, visitNode(node.body, visitor, isBlock)));
                }
                else {
                    hoistedStatements = append(hoistedStatements, visitEachChild(node, visitor, context));
                }
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    hoistedStatements = appendExportsOfHoistedDeclaration(hoistedStatements, node);
                }
                return void 0;
            }
            function visitClassDeclaration(node) {
                let statements;
                const name = factory2.getLocalName(node);
                hoistVariableDeclaration(name);
                statements = append(statements, setTextRange(factory2.createExpressionStatement(factory2.createAssignment(name, setTextRange(factory2.createClassExpression(visitNodes2(node.modifiers, modifierVisitor, isModifierLike), node.name, 
                /*typeParameters*/
                void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), visitNodes2(node.members, visitor, isClassElement)), node))), node));
                if (hasAssociatedEndOfDeclarationMarker(node)) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfHoistedDeclaration(deferredExports[id], node);
                }
                else {
                    statements = appendExportsOfHoistedDeclaration(statements, node);
                }
                return singleOrMany(statements);
            }
            function visitVariableStatement(node) {
                if (!shouldHoistVariableDeclarationList(node.declarationList)) {
                    return visitNode(node, visitor, isStatement);
                }
                let expressions;
                const isExportedDeclaration = hasSyntacticModifier(node, 1 /* Export */);
                const isMarkedDeclaration = hasAssociatedEndOfDeclarationMarker(node);
                for (const variable of node.declarationList.declarations) {
                    if (variable.initializer) {
                        expressions = append(expressions, transformInitializedVariable(variable, isExportedDeclaration && !isMarkedDeclaration));
                    }
                    else {
                        hoistBindingElement(variable);
                    }
                }
                let statements;
                if (expressions) {
                    statements = append(statements, setTextRange(factory2.createExpressionStatement(factory2.inlineExpressions(expressions)), node));
                }
                if (isMarkedDeclaration) {
                    const id = getOriginalNodeId(node);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node, isExportedDeclaration);
                }
                else {
                    statements = appendExportsOfVariableStatement(statements, node, 
                    /*exportSelf*/
                    false);
                }
                return singleOrMany(statements);
            }
            function hoistBindingElement(node) {
                if (isBindingPattern(node.name)) {
                    for (const element of node.name.elements) {
                        if (!isOmittedExpression(element)) {
                            hoistBindingElement(element);
                        }
                    }
                }
                else {
                    hoistVariableDeclaration(factory2.cloneNode(node.name));
                }
            }
            function shouldHoistVariableDeclarationList(node) {
                return (getEmitFlags(node) & 4194304 /* NoHoisting */) === 0 && (enclosingBlockScopedContainer.kind === 308 /* SourceFile */ || (getOriginalNode(node).flags & 3 /* BlockScoped */) === 0);
            }
            function transformInitializedVariable(node, isExportedDeclaration) {
                const createAssignment = isExportedDeclaration ? createExportedVariableAssignment : createNonExportedVariableAssignment;
                return isBindingPattern(node.name) ? flattenDestructuringAssignment(node, visitor, context, 0 /* All */, 
                /*needsValue*/
                false, createAssignment) : node.initializer ? createAssignment(node.name, visitNode(node.initializer, visitor, isExpression)) : node.name;
            }
            function createExportedVariableAssignment(name, value, location) {
                return createVariableAssignment(name, value, location, 
                /*isExportedDeclaration*/
                true);
            }
            function createNonExportedVariableAssignment(name, value, location) {
                return createVariableAssignment(name, value, location, 
                /*isExportedDeclaration*/
                false);
            }
            function createVariableAssignment(name, value, location, isExportedDeclaration) {
                hoistVariableDeclaration(factory2.cloneNode(name));
                return isExportedDeclaration ? createExportExpression(name, preventSubstitution(setTextRange(factory2.createAssignment(name, value), location))) : preventSubstitution(setTextRange(factory2.createAssignment(name, value), location));
            }
            function visitMergeDeclarationMarker(node) {
                if (hasAssociatedEndOfDeclarationMarker(node) && node.original.kind === 240 /* VariableStatement */) {
                    const id = getOriginalNodeId(node);
                    const isExportedDeclaration = hasSyntacticModifier(node.original, 1 /* Export */);
                    deferredExports[id] = appendExportsOfVariableStatement(deferredExports[id], node.original, isExportedDeclaration);
                }
                return node;
            }
            function hasAssociatedEndOfDeclarationMarker(node) {
                return (getEmitFlags(node) & 8388608 /* HasEndOfDeclarationMarker */) !== 0;
            }
            function visitEndOfDeclarationMarker(node) {
                const id = getOriginalNodeId(node);
                const statements = deferredExports[id];
                if (statements) {
                    delete deferredExports[id];
                    return append(statements, node);
                }
                else {
                    const original = getOriginalNode(node);
                    if (isModuleOrEnumDeclaration(original)) {
                        return append(appendExportsOfDeclaration(statements, original), node);
                    }
                }
                return node;
            }
            function appendExportsOfImportDeclaration(statements, decl) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                const importClause = decl.importClause;
                if (!importClause) {
                    return statements;
                }
                if (importClause.name) {
                    statements = appendExportsOfDeclaration(statements, importClause);
                }
                const namedBindings = importClause.namedBindings;
                if (namedBindings) {
                    switch (namedBindings.kind) {
                        case 271 /* NamespaceImport */:
                            statements = appendExportsOfDeclaration(statements, namedBindings);
                            break;
                        case 272 /* NamedImports */:
                            for (const importBinding of namedBindings.elements) {
                                statements = appendExportsOfDeclaration(statements, importBinding);
                            }
                            break;
                    }
                }
                return statements;
            }
            function appendExportsOfImportEqualsDeclaration(statements, decl) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                return appendExportsOfDeclaration(statements, decl);
            }
            function appendExportsOfVariableStatement(statements, node, exportSelf) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                for (const decl of node.declarationList.declarations) {
                    if (decl.initializer || exportSelf) {
                        statements = appendExportsOfBindingElement(statements, decl, exportSelf);
                    }
                }
                return statements;
            }
            function appendExportsOfBindingElement(statements, decl, exportSelf) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                if (isBindingPattern(decl.name)) {
                    for (const element of decl.name.elements) {
                        if (!isOmittedExpression(element)) {
                            statements = appendExportsOfBindingElement(statements, element, exportSelf);
                        }
                    }
                }
                else if (!isGeneratedIdentifier(decl.name)) {
                    let excludeName;
                    if (exportSelf) {
                        statements = appendExportStatement(statements, decl.name, factory2.getLocalName(decl));
                        excludeName = idText(decl.name);
                    }
                    statements = appendExportsOfDeclaration(statements, decl, excludeName);
                }
                return statements;
            }
            function appendExportsOfHoistedDeclaration(statements, decl) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                let excludeName;
                if (hasSyntacticModifier(decl, 1 /* Export */)) {
                    const exportName = hasSyntacticModifier(decl, 1024 /* Default */) ? factory2.createStringLiteral("default") : decl.name;
                    statements = appendExportStatement(statements, exportName, factory2.getLocalName(decl));
                    excludeName = getTextOfIdentifierOrLiteral(exportName);
                }
                if (decl.name) {
                    statements = appendExportsOfDeclaration(statements, decl, excludeName);
                }
                return statements;
            }
            function appendExportsOfDeclaration(statements, decl, excludeName) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                const name = factory2.getDeclarationName(decl);
                const exportSpecifiers = moduleInfo.exportSpecifiers.get(idText(name));
                if (exportSpecifiers) {
                    for (const exportSpecifier of exportSpecifiers) {
                        if (exportSpecifier.name.escapedText !== excludeName) {
                            statements = appendExportStatement(statements, exportSpecifier.name, name);
                        }
                    }
                }
                return statements;
            }
            function appendExportStatement(statements, exportName, expression, allowComments) {
                statements = append(statements, createExportStatement(exportName, expression, allowComments));
                return statements;
            }
            function createExportStatement(name, value, allowComments) {
                const statement = factory2.createExpressionStatement(createExportExpression(name, value));
                startOnNewLine(statement);
                if (!allowComments) {
                    setEmitFlags(statement, 3072 /* NoComments */);
                }
                return statement;
            }
            function createExportExpression(name, value) {
                const exportName = isIdentifier(name) ? factory2.createStringLiteralFromNode(name) : name;
                setEmitFlags(value, getEmitFlags(value) | 3072 /* NoComments */);
                return setCommentRange(factory2.createCallExpression(exportFunction, 
                /*typeArguments*/
                void 0, [exportName, value]), value);
            }
            function topLevelNestedVisitor(node) {
                switch (node.kind) {
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*isTopLevel*/
                        true);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node);
                    case 243 /* DoStatement */:
                        return visitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return visitWhileStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 251 /* WithStatement */:
                        return visitWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 266 /* CaseBlock */:
                        return visitCaseBlock(node);
                    case 292 /* CaseClause */:
                        return visitCaseClause(node);
                    case 293 /* DefaultClause */:
                        return visitDefaultClause(node);
                    case 255 /* TryStatement */:
                        return visitTryStatement(node);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 238 /* Block */:
                        return visitBlock(node);
                    case 358 /* MergeDeclarationMarker */:
                        return visitMergeDeclarationMarker(node);
                    case 359 /* EndOfDeclarationMarker */:
                        return visitEndOfDeclarationMarker(node);
                    default:
                        return visitor(node);
                }
            }
            function visitForStatement(node, isTopLevel) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForStatement(node, visitNode(node.initializer, isTopLevel ? visitForInitializer : discardedValueVisitor, isForInitializer), visitNode(node.condition, visitor, isExpression), visitNode(node.incrementor, discardedValueVisitor, isExpression), visitIterationBody(node.statement, isTopLevel ? topLevelNestedVisitor : visitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function visitForInStatement(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForInStatement(node, visitForInitializer(node.initializer), visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function visitForOfStatement(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateForOfStatement(node, node.awaitModifier, visitForInitializer(node.initializer), visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function shouldHoistForInitializer(node) {
                return isVariableDeclarationList(node) && shouldHoistVariableDeclarationList(node);
            }
            function visitForInitializer(node) {
                if (shouldHoistForInitializer(node)) {
                    let expressions;
                    for (const variable of node.declarations) {
                        expressions = append(expressions, transformInitializedVariable(variable, 
                        /*isExportedDeclaration*/
                        false));
                        if (!variable.initializer) {
                            hoistBindingElement(variable);
                        }
                    }
                    return expressions ? factory2.inlineExpressions(expressions) : factory2.createOmittedExpression();
                }
                else {
                    return visitNode(node, discardedValueVisitor, isForInitializer);
                }
            }
            function visitDoStatement(node) {
                return factory2.updateDoStatement(node, visitIterationBody(node.statement, topLevelNestedVisitor, context), visitNode(node.expression, visitor, isExpression));
            }
            function visitWhileStatement(node) {
                return factory2.updateWhileStatement(node, visitNode(node.expression, visitor, isExpression), visitIterationBody(node.statement, topLevelNestedVisitor, context));
            }
            function visitLabeledStatement(node) {
                return factory2.updateLabeledStatement(node, node.label, Debug.checkDefined(visitNode(node.statement, topLevelNestedVisitor, isStatement, factory2.liftToBlock)));
            }
            function visitWithStatement(node) {
                return factory2.updateWithStatement(node, visitNode(node.expression, visitor, isExpression), Debug.checkDefined(visitNode(node.statement, topLevelNestedVisitor, isStatement, factory2.liftToBlock)));
            }
            function visitSwitchStatement(node) {
                return factory2.updateSwitchStatement(node, visitNode(node.expression, visitor, isExpression), Debug.checkDefined(visitNode(node.caseBlock, topLevelNestedVisitor, isCaseBlock)));
            }
            function visitCaseBlock(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateCaseBlock(node, visitNodes2(node.clauses, topLevelNestedVisitor, isCaseOrDefaultClause));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function visitCaseClause(node) {
                return factory2.updateCaseClause(node, visitNode(node.expression, visitor, isExpression), visitNodes2(node.statements, topLevelNestedVisitor, isStatement));
            }
            function visitDefaultClause(node) {
                return visitEachChild(node, topLevelNestedVisitor, context);
            }
            function visitTryStatement(node) {
                return visitEachChild(node, topLevelNestedVisitor, context);
            }
            function visitCatchClause(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = factory2.updateCatchClause(node, node.variableDeclaration, Debug.checkDefined(visitNode(node.block, topLevelNestedVisitor, isBlock)));
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function visitBlock(node) {
                const savedEnclosingBlockScopedContainer = enclosingBlockScopedContainer;
                enclosingBlockScopedContainer = node;
                node = visitEachChild(node, topLevelNestedVisitor, context);
                enclosingBlockScopedContainer = savedEnclosingBlockScopedContainer;
                return node;
            }
            function visitorWorker(node, valueIsDiscarded) {
                if (!(node.transformFlags & (4096 /* ContainsDestructuringAssignment */ | 8388608 /* ContainsDynamicImport */ | 268435456 /* ContainsUpdateExpressionForIdentifier */))) {
                    return node;
                }
                switch (node.kind) {
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*isTopLevel*/
                        false);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, valueIsDiscarded);
                    case 356 /* PartiallyEmittedExpression */:
                        return visitPartiallyEmittedExpression(node, valueIsDiscarded);
                    case 223 /* BinaryExpression */:
                        if (isDestructuringAssignment(node)) {
                            return visitDestructuringAssignment(node, valueIsDiscarded);
                        }
                        break;
                    case 210 /* CallExpression */:
                        if (isImportCall(node)) {
                            return visitImportCallExpression(node);
                        }
                        break;
                    case 221 /* PrefixUnaryExpression */:
                    case 222 /* PostfixUnaryExpression */:
                        return visitPrefixOrPostfixUnaryExpression(node, valueIsDiscarded);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                return visitorWorker(node, 
                /*valueIsDiscarded*/
                false);
            }
            function discardedValueVisitor(node) {
                return visitorWorker(node, 
                /*valueIsDiscarded*/
                true);
            }
            function visitExpressionStatement(node) {
                return factory2.updateExpressionStatement(node, visitNode(node.expression, discardedValueVisitor, isExpression));
            }
            function visitParenthesizedExpression(node, valueIsDiscarded) {
                return factory2.updateParenthesizedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }
            function visitPartiallyEmittedExpression(node, valueIsDiscarded) {
                return factory2.updatePartiallyEmittedExpression(node, visitNode(node.expression, valueIsDiscarded ? discardedValueVisitor : visitor, isExpression));
            }
            function visitImportCallExpression(node) {
                const externalModuleName = getExternalModuleNameLiteral(factory2, node, currentSourceFile, host, resolver, compilerOptions);
                const firstArgument = visitNode(firstOrUndefined(node.arguments), visitor, isExpression);
                const argument = externalModuleName && (!firstArgument || !isStringLiteral(firstArgument) || firstArgument.text !== externalModuleName.text) ? externalModuleName : firstArgument;
                return factory2.createCallExpression(factory2.createPropertyAccessExpression(contextObject, factory2.createIdentifier("import")), 
                /*typeArguments*/
                void 0, argument ? [argument] : []);
            }
            function visitDestructuringAssignment(node, valueIsDiscarded) {
                if (hasExportedReferenceInDestructuringTarget(node.left)) {
                    return flattenDestructuringAssignment(node, visitor, context, 0 /* All */, !valueIsDiscarded);
                }
                return visitEachChild(node, visitor, context);
            }
            function hasExportedReferenceInDestructuringTarget(node) {
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true)) {
                    return hasExportedReferenceInDestructuringTarget(node.left);
                }
                else if (isSpreadElement(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.expression);
                }
                else if (isObjectLiteralExpression(node)) {
                    return some(node.properties, hasExportedReferenceInDestructuringTarget);
                }
                else if (isArrayLiteralExpression(node)) {
                    return some(node.elements, hasExportedReferenceInDestructuringTarget);
                }
                else if (isShorthandPropertyAssignment(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.name);
                }
                else if (isPropertyAssignment(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.initializer);
                }
                else if (isIdentifier(node)) {
                    const container = resolver.getReferencedExportContainer(node);
                    return container !== void 0 && container.kind === 308 /* SourceFile */;
                }
                else {
                    return false;
                }
            }
            function visitPrefixOrPostfixUnaryExpression(node, valueIsDiscarded) {
                if ((node.operator === 45 /* PlusPlusToken */ || node.operator === 46 /* MinusMinusToken */) && isIdentifier(node.operand) && !isGeneratedIdentifier(node.operand) && !isLocalName(node.operand) && !isDeclarationNameOfEnumOrNamespace(node.operand)) {
                    const exportedNames = getExports(node.operand);
                    if (exportedNames) {
                        let temp;
                        let expression = visitNode(node.operand, visitor, isExpression);
                        if (isPrefixUnaryExpression(node)) {
                            expression = factory2.updatePrefixUnaryExpression(node, expression);
                        }
                        else {
                            expression = factory2.updatePostfixUnaryExpression(node, expression);
                            if (!valueIsDiscarded) {
                                temp = factory2.createTempVariable(hoistVariableDeclaration);
                                expression = factory2.createAssignment(temp, expression);
                                setTextRange(expression, node);
                            }
                            expression = factory2.createComma(expression, factory2.cloneNode(node.operand));
                            setTextRange(expression, node);
                        }
                        for (const exportName of exportedNames) {
                            expression = createExportExpression(exportName, preventSubstitution(expression));
                        }
                        if (temp) {
                            expression = factory2.createComma(expression, temp);
                            setTextRange(expression, node);
                        }
                        return expression;
                    }
                }
                return visitEachChild(node, visitor, context);
            }
            function modifierVisitor(node) {
                switch (node.kind) {
                    case 93 /* ExportKeyword */:
                    case 88 /* DefaultKeyword */:
                        return void 0;
                }
                return node;
            }
            function onEmitNode(hint, node, emitCallback) {
                if (node.kind === 308 /* SourceFile */) {
                    const id = getOriginalNodeId(node);
                    currentSourceFile = node;
                    moduleInfo = moduleInfoMap[id];
                    exportFunction = exportFunctionsMap[id];
                    noSubstitution = noSubstitutionMap[id];
                    contextObject = contextObjectMap[id];
                    if (noSubstitution) {
                        delete noSubstitutionMap[id];
                    }
                    previousOnEmitNode(hint, node, emitCallback);
                    currentSourceFile = void 0;
                    moduleInfo = void 0;
                    exportFunction = void 0;
                    contextObject = void 0;
                    noSubstitution = void 0;
                }
                else {
                    previousOnEmitNode(hint, node, emitCallback);
                }
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (isSubstitutionPrevented(node)) {
                    return node;
                }
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                else if (hint === 4 /* Unspecified */) {
                    return substituteUnspecified(node);
                }
                return node;
            }
            function substituteUnspecified(node) {
                switch (node.kind) {
                    case 300 /* ShorthandPropertyAssignment */:
                        return substituteShorthandPropertyAssignment(node);
                }
                return node;
            }
            function substituteShorthandPropertyAssignment(node) {
                var _a2, _b;
                const name = node.name;
                if (!isGeneratedIdentifier(name) && !isLocalName(name)) {
                    const importDeclaration = resolver.getReferencedImportDeclaration(name);
                    if (importDeclaration) {
                        if (isImportClause(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAssignment(factory2.cloneNode(name), factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(importDeclaration.parent), factory2.createIdentifier("default"))), 
                            /*location*/
                            node);
                        }
                        else if (isImportSpecifier(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAssignment(factory2.cloneNode(name), factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(((_b = (_a2 = importDeclaration.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.parent) || importDeclaration), factory2.cloneNode(importDeclaration.propertyName || importDeclaration.name))), 
                            /*location*/
                            node);
                        }
                    }
                }
                return node;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                    case 223 /* BinaryExpression */:
                        return substituteBinaryExpression(node);
                    case 233 /* MetaProperty */:
                        return substituteMetaProperty(node);
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                var _a2, _b;
                if (getEmitFlags(node) & 8192 /* HelperName */) {
                    const externalHelpersModuleName = getExternalHelpersModuleName(currentSourceFile);
                    if (externalHelpersModuleName) {
                        return factory2.createPropertyAccessExpression(externalHelpersModuleName, node);
                    }
                    return node;
                }
                if (!isGeneratedIdentifier(node) && !isLocalName(node)) {
                    const importDeclaration = resolver.getReferencedImportDeclaration(node);
                    if (importDeclaration) {
                        if (isImportClause(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(importDeclaration.parent), factory2.createIdentifier("default")), 
                            /*location*/
                            node);
                        }
                        else if (isImportSpecifier(importDeclaration)) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(((_b = (_a2 = importDeclaration.parent) == null ? void 0 : _a2.parent) == null ? void 0 : _b.parent) || importDeclaration), factory2.cloneNode(importDeclaration.propertyName || importDeclaration.name)), 
                            /*location*/
                            node);
                        }
                    }
                }
                return node;
            }
            function substituteBinaryExpression(node) {
                if (isAssignmentOperator(node.operatorToken.kind) && isIdentifier(node.left) && !isGeneratedIdentifier(node.left) && !isLocalName(node.left) && !isDeclarationNameOfEnumOrNamespace(node.left)) {
                    const exportedNames = getExports(node.left);
                    if (exportedNames) {
                        let expression = node;
                        for (const exportName of exportedNames) {
                            expression = createExportExpression(exportName, preventSubstitution(expression));
                        }
                        return expression;
                    }
                }
                return node;
            }
            function substituteMetaProperty(node) {
                if (isImportMeta(node)) {
                    return factory2.createPropertyAccessExpression(contextObject, factory2.createIdentifier("meta"));
                }
                return node;
            }
            function getExports(name) {
                let exportedNames;
                if (!isGeneratedIdentifier(name)) {
                    const valueDeclaration = resolver.getReferencedImportDeclaration(name) || resolver.getReferencedValueDeclaration(name);
                    if (valueDeclaration) {
                        const exportContainer = resolver.getReferencedExportContainer(name, 
                        /*prefixLocals*/
                        false);
                        if (exportContainer && exportContainer.kind === 308 /* SourceFile */) {
                            exportedNames = append(exportedNames, factory2.getDeclarationName(valueDeclaration));
                        }
                        exportedNames = addRange(exportedNames, moduleInfo && moduleInfo.exportedBindings[getOriginalNodeId(valueDeclaration)]);
                    }
                }
                return exportedNames;
            }
            function preventSubstitution(node) {
                if (noSubstitution === void 0)
                    noSubstitution = [];
                noSubstitution[getNodeId(node)] = true;
                return node;
            }
            function isSubstitutionPrevented(node) {
                return noSubstitution && node.id && noSubstitution[node.id];
            }
        }