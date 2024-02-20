function transformTypeScript(context) {
            const { factory: factory2, getEmitHelperFactory: emitHelpers, startLexicalEnvironment, resumeLexicalEnvironment, endLexicalEnvironment, hoistVariableDeclaration } = context;
            const resolver = context.getEmitResolver();
            const compilerOptions = context.getCompilerOptions();
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const moduleKind = getEmitModuleKind(compilerOptions);
            const legacyDecorators = !!compilerOptions.experimentalDecorators;
            const typeSerializer = compilerOptions.emitDecoratorMetadata ? createRuntimeTypeSerializer(context) : void 0;
            const previousOnEmitNode = context.onEmitNode;
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onEmitNode = onEmitNode;
            context.onSubstituteNode = onSubstituteNode;
            context.enableSubstitution(208 /* PropertyAccessExpression */);
            context.enableSubstitution(209 /* ElementAccessExpression */);
            let currentSourceFile;
            let currentNamespace;
            let currentNamespaceContainerName;
            let currentLexicalScope;
            let currentScopeFirstDeclarationsOfName;
            let currentClassHasParameterProperties;
            let enabledSubstitutions;
            let applicableSubstitutions;
            return transformSourceFileOrBundle;
            function transformSourceFileOrBundle(node) {
                if (node.kind === 309 /* Bundle */) {
                    return transformBundle(node);
                }
                return transformSourceFile(node);
            }
            function transformBundle(node) {
                return factory2.createBundle(node.sourceFiles.map(transformSourceFile), mapDefined(node.prepends, (prepend) => {
                    if (prepend.kind === 311 /* InputFiles */) {
                        return createUnparsedSourceFile(prepend, "js");
                    }
                    return prepend;
                }));
            }
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                currentSourceFile = node;
                const visited = saveStateAndInvoke(node, visitSourceFile);
                addEmitHelpers(visited, context.readEmitHelpers());
                currentSourceFile = void 0;
                return visited;
            }
            function saveStateAndInvoke(node, f) {
                const savedCurrentScope = currentLexicalScope;
                const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
                const savedCurrentClassHasParameterProperties = currentClassHasParameterProperties;
                onBeforeVisitNode(node);
                const visited = f(node);
                if (currentLexicalScope !== savedCurrentScope) {
                    currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
                }
                currentLexicalScope = savedCurrentScope;
                currentClassHasParameterProperties = savedCurrentClassHasParameterProperties;
                return visited;
            }
            function onBeforeVisitNode(node) {
                switch (node.kind) {
                    case 308 /* SourceFile */:
                    case 266 /* CaseBlock */:
                    case 265 /* ModuleBlock */:
                    case 238 /* Block */:
                        currentLexicalScope = node;
                        currentScopeFirstDeclarationsOfName = void 0;
                        break;
                    case 260 /* ClassDeclaration */:
                    case 259 /* FunctionDeclaration */:
                        if (hasSyntacticModifier(node, 2 /* Ambient */)) {
                            break;
                        }
                        if (node.name) {
                            recordEmittedDeclarationInScope(node);
                        }
                        else {
                            Debug.assert(node.kind === 260 /* ClassDeclaration */ || hasSyntacticModifier(node, 1024 /* Default */));
                        }
                        break;
                }
            }
            function visitor(node) {
                return saveStateAndInvoke(node, visitorWorker);
            }
            function visitorWorker(node) {
                if (node.transformFlags & 1 /* ContainsTypeScript */) {
                    return visitTypeScript(node);
                }
                return node;
            }
            function sourceElementVisitor(node) {
                return saveStateAndInvoke(node, sourceElementVisitorWorker);
            }
            function sourceElementVisitorWorker(node) {
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                    case 268 /* ImportEqualsDeclaration */:
                    case 274 /* ExportAssignment */:
                    case 275 /* ExportDeclaration */:
                        return visitElidableStatement(node);
                    default:
                        return visitorWorker(node);
                }
            }
            function visitElidableStatement(node) {
                const parsed = getParseTreeNode(node);
                if (parsed !== node) {
                    if (node.transformFlags & 1 /* ContainsTypeScript */) {
                        return visitEachChild(node, visitor, context);
                    }
                    return node;
                }
                switch (node.kind) {
                    case 269 /* ImportDeclaration */:
                        return visitImportDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 274 /* ExportAssignment */:
                        return visitExportAssignment(node);
                    case 275 /* ExportDeclaration */:
                        return visitExportDeclaration(node);
                    default:
                        Debug.fail("Unhandled ellided statement");
                }
            }
            function namespaceElementVisitor(node) {
                return saveStateAndInvoke(node, namespaceElementVisitorWorker);
            }
            function namespaceElementVisitorWorker(node) {
                if (node.kind === 275 /* ExportDeclaration */ || node.kind === 269 /* ImportDeclaration */ || node.kind === 270 /* ImportClause */ || node.kind === 268 /* ImportEqualsDeclaration */ && node.moduleReference.kind === 280 /* ExternalModuleReference */) {
                    return void 0;
                }
                else if (node.transformFlags & 1 /* ContainsTypeScript */ || hasSyntacticModifier(node, 1 /* Export */)) {
                    return visitTypeScript(node);
                }
                return node;
            }
            function getClassElementVisitor(parent2) {
                return (node) => saveStateAndInvoke(node, (n) => classElementVisitorWorker(n, parent2));
            }
            function classElementVisitorWorker(node, parent2) {
                switch (node.kind) {
                    case 173 /* Constructor */:
                        return visitConstructor(node);
                    case 169 /* PropertyDeclaration */:
                        return visitPropertyDeclaration(node, parent2);
                    case 174 /* GetAccessor */:
                        return visitGetAccessor(node, parent2);
                    case 175 /* SetAccessor */:
                        return visitSetAccessor(node, parent2);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node, parent2);
                    case 172 /* ClassStaticBlockDeclaration */:
                        return visitEachChild(node, visitor, context);
                    case 237 /* SemicolonClassElement */:
                        return node;
                    case 178 /* IndexSignature */:
                        return;
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }
            function getObjectLiteralElementVisitor(parent2) {
                return (node) => saveStateAndInvoke(node, (n) => objectLiteralElementVisitorWorker(n, parent2));
            }
            function objectLiteralElementVisitorWorker(node, parent2) {
                switch (node.kind) {
                    case 299 /* PropertyAssignment */:
                    case 300 /* ShorthandPropertyAssignment */:
                    case 301 /* SpreadAssignment */:
                        return visitor(node);
                    case 174 /* GetAccessor */:
                        return visitGetAccessor(node, parent2);
                    case 175 /* SetAccessor */:
                        return visitSetAccessor(node, parent2);
                    case 171 /* MethodDeclaration */:
                        return visitMethodDeclaration(node, parent2);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
            }
            function decoratorElidingVisitor(node) {
                return isDecorator(node) ? void 0 : visitor(node);
            }
            function modifierElidingVisitor(node) {
                return isModifier(node) ? void 0 : visitor(node);
            }
            function modifierVisitor(node) {
                if (isDecorator(node))
                    return void 0;
                if (modifierToFlag(node.kind) & 117086 /* TypeScriptModifier */) {
                    return void 0;
                }
                else if (currentNamespace && node.kind === 93 /* ExportKeyword */) {
                    return void 0;
                }
                return node;
            }
            function visitTypeScript(node) {
                if (isStatement(node) && hasSyntacticModifier(node, 2 /* Ambient */)) {
                    return factory2.createNotEmittedStatement(node);
                }
                switch (node.kind) {
                    case 93 /* ExportKeyword */:
                    case 88 /* DefaultKeyword */:
                        return currentNamespace ? void 0 : node;
                    case 123 /* PublicKeyword */:
                    case 121 /* PrivateKeyword */:
                    case 122 /* ProtectedKeyword */:
                    case 126 /* AbstractKeyword */:
                    case 161 /* OverrideKeyword */:
                    case 85 /* ConstKeyword */:
                    case 136 /* DeclareKeyword */:
                    case 146 /* ReadonlyKeyword */:
                    case 101 /* InKeyword */:
                    case 145 /* OutKeyword */:
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                    case 187 /* OptionalType */:
                    case 188 /* RestType */:
                    case 184 /* TypeLiteral */:
                    case 179 /* TypePredicate */:
                    case 165 /* TypeParameter */:
                    case 131 /* AnyKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 134 /* BooleanKeyword */:
                    case 152 /* StringKeyword */:
                    case 148 /* NumberKeyword */:
                    case 144 /* NeverKeyword */:
                    case 114 /* VoidKeyword */:
                    case 153 /* SymbolKeyword */:
                    case 182 /* ConstructorType */:
                    case 181 /* FunctionType */:
                    case 183 /* TypeQuery */:
                    case 180 /* TypeReference */:
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                    case 191 /* ConditionalType */:
                    case 193 /* ParenthesizedType */:
                    case 194 /* ThisType */:
                    case 195 /* TypeOperator */:
                    case 196 /* IndexedAccessType */:
                    case 197 /* MappedType */:
                    case 198 /* LiteralType */:
                    case 178 /* IndexSignature */:
                        return void 0;
                    case 262 /* TypeAliasDeclaration */:
                        return factory2.createNotEmittedStatement(node);
                    case 267 /* NamespaceExportDeclaration */:
                        return void 0;
                    case 261 /* InterfaceDeclaration */:
                        return factory2.createNotEmittedStatement(node);
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 228 /* ClassExpression */:
                        return visitClassExpression(node);
                    case 294 /* HeritageClause */:
                        return visitHeritageClause(node);
                    case 230 /* ExpressionWithTypeArguments */:
                        return visitExpressionWithTypeArguments(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 173 /* Constructor */:
                    case 169 /* PropertyDeclaration */:
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                    case 172 /* ClassStaticBlockDeclaration */:
                        return Debug.fail("Class and object literal elements must be visited with their respective visitors");
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 216 /* ArrowFunction */:
                        return visitArrowFunction(node);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return visitAssertionExpression(node);
                    case 235 /* SatisfiesExpression */:
                        return visitSatisfiesExpression(node);
                    case 210 /* CallExpression */:
                        return visitCallExpression(node);
                    case 211 /* NewExpression */:
                        return visitNewExpression(node);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 232 /* NonNullExpression */:
                        return visitNonNullExpression(node);
                    case 263 /* EnumDeclaration */:
                        return visitEnumDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 264 /* ModuleDeclaration */:
                        return visitModuleDeclaration(node);
                    case 268 /* ImportEqualsDeclaration */:
                        return visitImportEqualsDeclaration(node);
                    case 282 /* JsxSelfClosingElement */:
                        return visitJsxSelfClosingElement(node);
                    case 283 /* JsxOpeningElement */:
                        return visitJsxJsxOpeningElement(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitSourceFile(node) {
                const alwaysStrict = getStrictOptionValue(compilerOptions, "alwaysStrict") && !(isExternalModule(node) && moduleKind >= 5 /* ES2015 */) && !isJsonSourceFile(node);
                return factory2.updateSourceFile(node, visitLexicalEnvironment(node.statements, sourceElementVisitor, context, 
                /*start*/
                0, alwaysStrict));
            }
            function visitObjectLiteralExpression(node) {
                return factory2.updateObjectLiteralExpression(node, visitNodes2(node.properties, getObjectLiteralElementVisitor(node), isObjectLiteralElementLike));
            }
            function getClassFacts(node) {
                let facts = 0 /* None */;
                if (some(getProperties(node, 
                /*requireInitialized*/
                true, 
                /*isStatic*/
                true)))
                    facts |= 1 /* HasStaticInitializedProperties */;
                const extendsClauseElement = getEffectiveBaseTypeNode(node);
                if (extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== 104 /* NullKeyword */)
                    facts |= 64 /* IsDerivedClass */;
                if (classOrConstructorParameterIsDecorated(legacyDecorators, node))
                    facts |= 2 /* HasClassOrConstructorParameterDecorators */;
                if (childIsDecorated(legacyDecorators, node))
                    facts |= 4 /* HasMemberDecorators */;
                if (isExportOfNamespace(node))
                    facts |= 8 /* IsExportOfNamespace */;
                else if (isDefaultExternalModuleExport(node))
                    facts |= 32 /* IsDefaultExternalExport */;
                else if (isNamedExternalModuleExport(node))
                    facts |= 16 /* IsNamedExternalExport */;
                return facts;
            }
            function hasTypeScriptClassSyntax(node) {
                return !!(node.transformFlags & 8192 /* ContainsTypeScriptClassSyntax */);
            }
            function isClassLikeDeclarationWithTypeScriptSyntax(node) {
                return hasDecorators(node) || some(node.typeParameters) || some(node.heritageClauses, hasTypeScriptClassSyntax) || some(node.members, hasTypeScriptClassSyntax);
            }
            function visitClassDeclaration(node) {
                var _a2;
                const facts = getClassFacts(node);
                const promoteToIIFE = languageVersion <= 1 /* ES5 */ && !!(facts & 7 /* MayNeedImmediatelyInvokedFunctionExpression */);
                if (!isClassLikeDeclarationWithTypeScriptSyntax(node) && !classOrConstructorParameterIsDecorated(legacyDecorators, node) && !isExportOfNamespace(node)) {
                    return factory2.updateClassDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), node.name, 
                    /*typeParameters*/
                    void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), visitNodes2(node.members, getClassElementVisitor(node), isClassElement));
                }
                if (promoteToIIFE) {
                    context.startLexicalEnvironment();
                }
                const moveModifiers = promoteToIIFE || facts & 8 /* IsExportOfNamespace */ || facts & 2 /* HasClassOrConstructorParameterDecorators */ && legacyDecorators || facts & 1 /* HasStaticInitializedProperties */;
                let modifiers = moveModifiers ? visitNodes2(node.modifiers, modifierElidingVisitor, isModifierLike) : visitNodes2(node.modifiers, visitor, isModifierLike);
                if (facts & 2 /* HasClassOrConstructorParameterDecorators */) {
                    modifiers = injectClassTypeMetadata(modifiers, node);
                }
                const needsName = moveModifiers && !node.name || facts & 4 /* HasMemberDecorators */ || facts & 1 /* HasStaticInitializedProperties */;
                const name = needsName ? (_a2 = node.name) != null ? _a2 : factory2.getGeneratedNameForNode(node) : node.name;
                const classDeclaration = factory2.updateClassDeclaration(node, modifiers, name, 
                /*typeParameters*/
                void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), transformClassMembers(node));
                let emitFlags = getEmitFlags(node);
                if (facts & 1 /* HasStaticInitializedProperties */) {
                    emitFlags |= 64 /* NoTrailingSourceMap */;
                }
                setEmitFlags(classDeclaration, emitFlags);
                let statement;
                if (promoteToIIFE) {
                    const statements = [classDeclaration];
                    const closingBraceLocation = createTokenRange(skipTrivia(currentSourceFile.text, node.members.end), 19 /* CloseBraceToken */);
                    const localName = factory2.getInternalName(node);
                    const outer = factory2.createPartiallyEmittedExpression(localName);
                    setTextRangeEnd(outer, closingBraceLocation.end);
                    setEmitFlags(outer, 3072 /* NoComments */);
                    const returnStatement = factory2.createReturnStatement(outer);
                    setTextRangePos(returnStatement, closingBraceLocation.pos);
                    setEmitFlags(returnStatement, 3072 /* NoComments */ | 768 /* NoTokenSourceMaps */);
                    statements.push(returnStatement);
                    insertStatementsAfterStandardPrologue(statements, context.endLexicalEnvironment());
                    const iife = factory2.createImmediatelyInvokedArrowFunction(statements);
                    setInternalEmitFlags(iife, 1 /* TypeScriptClassWrapper */);
                    const modifiers2 = facts & 16 /* IsNamedExternalExport */ ? factory2.createModifiersFromModifierFlags(1 /* Export */) : void 0;
                    const varStatement = factory2.createVariableStatement(modifiers2, factory2.createVariableDeclarationList([
                        factory2.createVariableDeclaration(factory2.getLocalName(node, 
                        /*allowComments*/
                        false, 
                        /*allowSourceMaps*/
                        false), 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, iife)
                    ], 1 /* Let */));
                    setOriginalNode(varStatement, node);
                    setCommentRange(varStatement, node);
                    setSourceMapRange(varStatement, moveRangePastDecorators(node));
                    startOnNewLine(varStatement);
                    statement = varStatement;
                }
                else {
                    statement = classDeclaration;
                }
                if (moveModifiers) {
                    if (facts & 8 /* IsExportOfNamespace */) {
                        return demarcateMultiStatementExport(statement, createExportMemberAssignmentStatement(node));
                    }
                    if (facts & 32 /* IsDefaultExternalExport */) {
                        return demarcateMultiStatementExport(statement, factory2.createExportDefault(factory2.getLocalName(node, 
                        /*allowComments*/
                        false, 
                        /*allowSourceMaps*/
                        true)));
                    }
                    if (facts & 16 /* IsNamedExternalExport */ && !promoteToIIFE) {
                        return demarcateMultiStatementExport(statement, factory2.createExternalModuleExport(factory2.getLocalName(node, 
                        /*allowComments*/
                        false, 
                        /*allowSourceMaps*/
                        true)));
                    }
                }
                return statement;
            }
            function demarcateMultiStatementExport(declarationStatement, exportStatement) {
                addEmitFlags(declarationStatement, 8388608 /* HasEndOfDeclarationMarker */);
                return [
                    declarationStatement,
                    exportStatement,
                    factory2.createEndOfDeclarationMarker(declarationStatement)
                ];
            }
            function visitClassExpression(node) {
                let modifiers = visitNodes2(node.modifiers, modifierElidingVisitor, isModifierLike);
                if (classOrConstructorParameterIsDecorated(legacyDecorators, node)) {
                    modifiers = injectClassTypeMetadata(modifiers, node);
                }
                return factory2.updateClassExpression(node, modifiers, node.name, 
                /*typeParameters*/
                void 0, visitNodes2(node.heritageClauses, visitor, isHeritageClause), transformClassMembers(node));
            }
            function transformClassMembers(node) {
                const members = visitNodes2(node.members, getClassElementVisitor(node), isClassElement);
                let newMembers;
                const constructor = getFirstConstructorWithBody(node);
                const parametersWithPropertyAssignments = constructor && filter(constructor.parameters, (p) => isParameterPropertyDeclaration(p, constructor));
                if (parametersWithPropertyAssignments) {
                    for (const parameter of parametersWithPropertyAssignments) {
                        const parameterProperty = factory2.createPropertyDeclaration(
                        /*modifiers*/
                        void 0, parameter.name, 
                        /*questionOrExclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0);
                        setOriginalNode(parameterProperty, parameter);
                        newMembers = append(newMembers, parameterProperty);
                    }
                }
                if (newMembers) {
                    newMembers = addRange(newMembers, members);
                    return setTextRange(factory2.createNodeArray(newMembers), 
                    /*location*/
                    node.members);
                }
                return members;
            }
            function injectClassTypeMetadata(modifiers, node) {
                const metadata = getTypeMetadata(node, node);
                if (some(metadata)) {
                    const modifiersArray = [];
                    addRange(modifiersArray, takeWhile(modifiers, isExportOrDefaultModifier));
                    addRange(modifiersArray, filter(modifiers, isDecorator));
                    addRange(modifiersArray, metadata);
                    addRange(modifiersArray, filter(skipWhile(modifiers, isExportOrDefaultModifier), isModifier));
                    modifiers = setTextRange(factory2.createNodeArray(modifiersArray), modifiers);
                }
                return modifiers;
            }
            function injectClassElementTypeMetadata(modifiers, node, container) {
                if (isClassLike(container) && classElementOrClassElementParameterIsDecorated(legacyDecorators, node, container)) {
                    const metadata = getTypeMetadata(node, container);
                    if (some(metadata)) {
                        const modifiersArray = [];
                        addRange(modifiersArray, filter(modifiers, isDecorator));
                        addRange(modifiersArray, metadata);
                        addRange(modifiersArray, filter(modifiers, isModifier));
                        modifiers = setTextRange(factory2.createNodeArray(modifiersArray), modifiers);
                    }
                }
                return modifiers;
            }
            function getTypeMetadata(node, container) {
                if (!legacyDecorators)
                    return void 0;
                return USE_NEW_TYPE_METADATA_FORMAT ? getNewTypeMetadata(node, container) : getOldTypeMetadata(node, container);
            }
            function getOldTypeMetadata(node, container) {
                if (typeSerializer) {
                    let decorators;
                    if (shouldAddTypeMetadata(node)) {
                        const typeMetadata = emitHelpers().createMetadataHelper("design:type", typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                        decorators = append(decorators, factory2.createDecorator(typeMetadata));
                    }
                    if (shouldAddParamTypesMetadata(node)) {
                        const paramTypesMetadata = emitHelpers().createMetadataHelper("design:paramtypes", typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container));
                        decorators = append(decorators, factory2.createDecorator(paramTypesMetadata));
                    }
                    if (shouldAddReturnTypeMetadata(node)) {
                        const returnTypeMetadata = emitHelpers().createMetadataHelper("design:returntype", typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                        decorators = append(decorators, factory2.createDecorator(returnTypeMetadata));
                    }
                    return decorators;
                }
            }
            function getNewTypeMetadata(node, container) {
                if (typeSerializer) {
                    let properties;
                    if (shouldAddTypeMetadata(node)) {
                        const typeProperty = factory2.createPropertyAssignment("type", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                        properties = append(properties, typeProperty);
                    }
                    if (shouldAddParamTypesMetadata(node)) {
                        const paramTypeProperty = factory2.createPropertyAssignment("paramTypes", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container)));
                        properties = append(properties, paramTypeProperty);
                    }
                    if (shouldAddReturnTypeMetadata(node)) {
                        const returnTypeProperty = factory2.createPropertyAssignment("returnType", factory2.createArrowFunction(
                        /*modifiers*/
                        void 0, 
                        /*typeParameters*/
                        void 0, [], 
                        /*type*/
                        void 0, factory2.createToken(38 /* EqualsGreaterThanToken */), typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node)));
                        properties = append(properties, returnTypeProperty);
                    }
                    if (properties) {
                        const typeInfoMetadata = emitHelpers().createMetadataHelper("design:typeinfo", factory2.createObjectLiteralExpression(properties, 
                        /*multiLine*/
                        true));
                        return [factory2.createDecorator(typeInfoMetadata)];
                    }
                }
            }
            function shouldAddTypeMetadata(node) {
                const kind = node.kind;
                return kind === 171 /* MethodDeclaration */ || kind === 174 /* GetAccessor */ || kind === 175 /* SetAccessor */ || kind === 169 /* PropertyDeclaration */;
            }
            function shouldAddReturnTypeMetadata(node) {
                return node.kind === 171 /* MethodDeclaration */;
            }
            function shouldAddParamTypesMetadata(node) {
                switch (node.kind) {
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return getFirstConstructorWithBody(node) !== void 0;
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return true;
                }
                return false;
            }
            function getExpressionForPropertyName(member, generateNameForComputedPropertyName) {
                const name = member.name;
                if (isPrivateIdentifier(name)) {
                    return factory2.createIdentifier("");
                }
                else if (isComputedPropertyName(name)) {
                    return generateNameForComputedPropertyName && !isSimpleInlineableExpression(name.expression) ? factory2.getGeneratedNameForNode(name) : name.expression;
                }
                else if (isIdentifier(name)) {
                    return factory2.createStringLiteral(idText(name));
                }
                else {
                    return factory2.cloneNode(name);
                }
            }
            function visitPropertyNameOfClassElement(member) {
                const name = member.name;
                if (isComputedPropertyName(name) && (!hasStaticModifier(member) && currentClassHasParameterProperties || hasDecorators(member) && legacyDecorators)) {
                    const expression = visitNode(name.expression, visitor, isExpression);
                    Debug.assert(expression);
                    const innerExpression = skipPartiallyEmittedExpressions(expression);
                    if (!isSimpleInlineableExpression(innerExpression)) {
                        const generatedName = factory2.getGeneratedNameForNode(name);
                        hoistVariableDeclaration(generatedName);
                        return factory2.updateComputedPropertyName(name, factory2.createAssignment(generatedName, expression));
                    }
                }
                return Debug.checkDefined(visitNode(name, visitor, isPropertyName));
            }
            function visitHeritageClause(node) {
                if (node.token === 117 /* ImplementsKeyword */) {
                    return void 0;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitExpressionWithTypeArguments(node) {
                return factory2.updateExpressionWithTypeArguments(node, Debug.checkDefined(visitNode(node.expression, visitor, isLeftHandSideExpression)), 
                /*typeArguments*/
                void 0);
            }
            function shouldEmitFunctionLikeDeclaration(node) {
                return !nodeIsMissing(node.body);
            }
            function visitPropertyDeclaration(node, parent2) {
                const isAmbient = node.flags & 16777216 /* Ambient */ || hasSyntacticModifier(node, 256 /* Abstract */);
                if (isAmbient && !(legacyDecorators && hasDecorators(node))) {
                    return void 0;
                }
                let modifiers = isClassLike(parent2) ? !isAmbient ? visitNodes2(node.modifiers, visitor, isModifierLike) : visitNodes2(node.modifiers, modifierElidingVisitor, isModifierLike) : visitNodes2(node.modifiers, decoratorElidingVisitor, isModifierLike);
                modifiers = injectClassElementTypeMetadata(modifiers, node, parent2);
                if (isAmbient) {
                    return factory2.updatePropertyDeclaration(node, concatenate(modifiers, factory2.createModifiersFromModifierFlags(2 /* Ambient */)), Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)), 
                    /*questionOrExclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                return factory2.updatePropertyDeclaration(node, modifiers, visitPropertyNameOfClassElement(node), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
            }
            function visitConstructor(node) {
                if (!shouldEmitFunctionLikeDeclaration(node)) {
                    return void 0;
                }
                return factory2.updateConstructorDeclaration(node, 
                /*modifiers*/
                void 0, visitParameterList(node.parameters, visitor, context), transformConstructorBody(node.body, node));
            }
            function transformConstructorBody(body, constructor) {
                const parametersWithPropertyAssignments = constructor && filter(constructor.parameters, (p) => isParameterPropertyDeclaration(p, constructor));
                if (!some(parametersWithPropertyAssignments)) {
                    return visitFunctionBody(body, visitor, context);
                }
                let statements = [];
                resumeLexicalEnvironment();
                const prologueStatementCount = factory2.copyPrologue(body.statements, statements, 
                /*ensureUseStrict*/
                false, visitor);
                const superStatementIndex = findSuperStatementIndex(body.statements, prologueStatementCount);
                if (superStatementIndex >= 0) {
                    addRange(statements, visitNodes2(body.statements, visitor, isStatement, prologueStatementCount, superStatementIndex + 1 - prologueStatementCount));
                }
                const parameterPropertyAssignments = mapDefined(parametersWithPropertyAssignments, transformParameterWithPropertyAssignment);
                if (superStatementIndex >= 0) {
                    addRange(statements, parameterPropertyAssignments);
                }
                else {
                    statements = [
                        ...statements.slice(0, prologueStatementCount),
                        ...parameterPropertyAssignments,
                        ...statements.slice(prologueStatementCount)
                    ];
                }
                const start = superStatementIndex >= 0 ? superStatementIndex + 1 : prologueStatementCount;
                addRange(statements, visitNodes2(body.statements, visitor, isStatement, start));
                statements = factory2.mergeLexicalEnvironment(statements, endLexicalEnvironment());
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), body.statements), 
                /*multiLine*/
                true);
                setTextRange(block, 
                /*location*/
                body);
                setOriginalNode(block, body);
                return block;
            }
            function transformParameterWithPropertyAssignment(node) {
                const name = node.name;
                if (!isIdentifier(name)) {
                    return void 0;
                }
                const propertyName = setParent(setTextRange(factory2.cloneNode(name), name), name.parent);
                setEmitFlags(propertyName, 3072 /* NoComments */ | 96 /* NoSourceMap */);
                const localName = setParent(setTextRange(factory2.cloneNode(name), name), name.parent);
                setEmitFlags(localName, 3072 /* NoComments */);
                return startOnNewLine(removeAllComments(setTextRange(setOriginalNode(factory2.createExpressionStatement(factory2.createAssignment(setTextRange(factory2.createPropertyAccessExpression(factory2.createThis(), propertyName), node.name), localName)), node), moveRangePos(node, -1))));
            }
            function visitMethodDeclaration(node, parent2) {
                if (!(node.transformFlags & 1 /* ContainsTypeScript */)) {
                    return node;
                }
                if (!shouldEmitFunctionLikeDeclaration(node)) {
                    return void 0;
                }
                let modifiers = isClassLike(parent2) ? visitNodes2(node.modifiers, visitor, isModifierLike) : visitNodes2(node.modifiers, decoratorElidingVisitor, isModifierLike);
                modifiers = injectClassElementTypeMetadata(modifiers, node, parent2);
                return factory2.updateMethodDeclaration(node, modifiers, node.asteriskToken, visitPropertyNameOfClassElement(node), 
                /*questionToken*/
                void 0, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, visitFunctionBody(node.body, visitor, context));
            }
            function shouldEmitAccessorDeclaration(node) {
                return !(nodeIsMissing(node.body) && hasSyntacticModifier(node, 256 /* Abstract */));
            }
            function visitGetAccessor(node, parent2) {
                if (!(node.transformFlags & 1 /* ContainsTypeScript */)) {
                    return node;
                }
                if (!shouldEmitAccessorDeclaration(node)) {
                    return void 0;
                }
                let modifiers = isClassLike(parent2) ? visitNodes2(node.modifiers, visitor, isModifierLike) : visitNodes2(node.modifiers, decoratorElidingVisitor, isModifierLike);
                modifiers = injectClassElementTypeMetadata(modifiers, node, parent2);
                return factory2.updateGetAccessorDeclaration(node, modifiers, visitPropertyNameOfClassElement(node), visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, visitFunctionBody(node.body, visitor, context) || factory2.createBlock([]));
            }
            function visitSetAccessor(node, parent2) {
                if (!(node.transformFlags & 1 /* ContainsTypeScript */)) {
                    return node;
                }
                if (!shouldEmitAccessorDeclaration(node)) {
                    return void 0;
                }
                let modifiers = isClassLike(parent2) ? visitNodes2(node.modifiers, visitor, isModifierLike) : visitNodes2(node.modifiers, decoratorElidingVisitor, isModifierLike);
                modifiers = injectClassElementTypeMetadata(modifiers, node, parent2);
                return factory2.updateSetAccessorDeclaration(node, modifiers, visitPropertyNameOfClassElement(node), visitParameterList(node.parameters, visitor, context), visitFunctionBody(node.body, visitor, context) || factory2.createBlock([]));
            }
            function visitFunctionDeclaration(node) {
                if (!shouldEmitFunctionLikeDeclaration(node)) {
                    return factory2.createNotEmittedStatement(node);
                }
                const updated = factory2.updateFunctionDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, visitFunctionBody(node.body, visitor, context) || factory2.createBlock([]));
                if (isExportOfNamespace(node)) {
                    const statements = [updated];
                    addExportMemberAssignment(statements, node);
                    return statements;
                }
                return updated;
            }
            function visitFunctionExpression(node) {
                if (!shouldEmitFunctionLikeDeclaration(node)) {
                    return factory2.createOmittedExpression();
                }
                const updated = factory2.updateFunctionExpression(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), node.asteriskToken, node.name, 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, visitFunctionBody(node.body, visitor, context) || factory2.createBlock([]));
                return updated;
            }
            function visitArrowFunction(node) {
                const updated = factory2.updateArrowFunction(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), 
                /*typeParameters*/
                void 0, visitParameterList(node.parameters, visitor, context), 
                /*type*/
                void 0, node.equalsGreaterThanToken, visitFunctionBody(node.body, visitor, context));
                return updated;
            }
            function visitParameter(node) {
                if (parameterIsThisKeyword(node)) {
                    return void 0;
                }
                const updated = factory2.updateParameterDeclaration(node, visitNodes2(node.modifiers, (node2) => isDecorator(node2) ? visitor(node2) : void 0, isModifierLike), node.dotDotDotToken, Debug.checkDefined(visitNode(node.name, visitor, isBindingName)), 
                /*questionToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
                if (updated !== node) {
                    setCommentRange(updated, node);
                    setTextRange(updated, moveRangePastModifiers(node));
                    setSourceMapRange(updated, moveRangePastModifiers(node));
                    setEmitFlags(updated.name, 64 /* NoTrailingSourceMap */);
                }
                return updated;
            }
            function visitVariableStatement(node) {
                if (isExportOfNamespace(node)) {
                    const variables = getInitializedVariables(node.declarationList);
                    if (variables.length === 0) {
                        return void 0;
                    }
                    return setTextRange(factory2.createExpressionStatement(factory2.inlineExpressions(map(variables, transformInitializedVariable))), node);
                }
                else {
                    return visitEachChild(node, visitor, context);
                }
            }
            function transformInitializedVariable(node) {
                const name = node.name;
                if (isBindingPattern(name)) {
                    return flattenDestructuringAssignment(node, visitor, context, 0 /* All */, 
                    /*needsValue*/
                    false, createNamespaceExportExpression);
                }
                else {
                    return setTextRange(factory2.createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(name), Debug.checkDefined(visitNode(node.initializer, visitor, isExpression))), 
                    /*location*/
                    node);
                }
            }
            function visitVariableDeclaration(node) {
                const updated = factory2.updateVariableDeclaration(node, Debug.checkDefined(visitNode(node.name, visitor, isBindingName)), 
                /*exclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
                if (node.type) {
                    setTypeNode(updated.name, node.type);
                }
                return updated;
            }
            function visitParenthesizedExpression(node) {
                const innerExpression = skipOuterExpressions(node.expression, ~6 /* Assertions */);
                if (isAssertionExpression(innerExpression)) {
                    const expression = visitNode(node.expression, visitor, isExpression);
                    Debug.assert(expression);
                    return factory2.createPartiallyEmittedExpression(expression, node);
                }
                return visitEachChild(node, visitor, context);
            }
            function visitAssertionExpression(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                return factory2.createPartiallyEmittedExpression(expression, node);
            }
            function visitNonNullExpression(node) {
                const expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
                Debug.assert(expression);
                return factory2.createPartiallyEmittedExpression(expression, node);
            }
            function visitSatisfiesExpression(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                return factory2.createPartiallyEmittedExpression(expression, node);
            }
            function visitCallExpression(node) {
                return factory2.updateCallExpression(node, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), 
                /*typeArguments*/
                void 0, visitNodes2(node.arguments, visitor, isExpression));
            }
            function visitNewExpression(node) {
                return factory2.updateNewExpression(node, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), 
                /*typeArguments*/
                void 0, visitNodes2(node.arguments, visitor, isExpression));
            }
            function visitTaggedTemplateExpression(node) {
                return factory2.updateTaggedTemplateExpression(node, Debug.checkDefined(visitNode(node.tag, visitor, isExpression)), 
                /*typeArguments*/
                void 0, Debug.checkDefined(visitNode(node.template, visitor, isTemplateLiteral)));
            }
            function visitJsxSelfClosingElement(node) {
                return factory2.updateJsxSelfClosingElement(node, Debug.checkDefined(visitNode(node.tagName, visitor, isJsxTagNameExpression)), 
                /*typeArguments*/
                void 0, Debug.checkDefined(visitNode(node.attributes, visitor, isJsxAttributes)));
            }
            function visitJsxJsxOpeningElement(node) {
                return factory2.updateJsxOpeningElement(node, Debug.checkDefined(visitNode(node.tagName, visitor, isJsxTagNameExpression)), 
                /*typeArguments*/
                void 0, Debug.checkDefined(visitNode(node.attributes, visitor, isJsxAttributes)));
            }
            function shouldEmitEnumDeclaration(node) {
                return !isEnumConst(node) || shouldPreserveConstEnums(compilerOptions);
            }
            function visitEnumDeclaration(node) {
                if (!shouldEmitEnumDeclaration(node)) {
                    return factory2.createNotEmittedStatement(node);
                }
                const statements = [];
                let emitFlags = 4 /* AdviseOnEmitNode */;
                const varAdded = addVarForEnumOrModuleDeclaration(statements, node);
                if (varAdded) {
                    if (moduleKind !== 4 /* System */ || currentLexicalScope !== currentSourceFile) {
                        emitFlags |= 1024 /* NoLeadingComments */;
                    }
                }
                const parameterName = getNamespaceParameterName(node);
                const containerName = getNamespaceContainerName(node);
                const exportName = hasSyntacticModifier(node, 1 /* Export */) ? factory2.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                let moduleArg = factory2.createLogicalOr(exportName, factory2.createAssignment(exportName, factory2.createObjectLiteralExpression()));
                if (hasNamespaceQualifiedExportName(node)) {
                    const localName = factory2.getLocalName(node, 
                    /*allowComments*/
                    false, 
                    /*allowSourceMaps*/
                    true);
                    moduleArg = factory2.createAssignment(localName, moduleArg);
                }
                const enumStatement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createFunctionExpression(
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
                void 0, transformEnumBody(node, containerName)), 
                /*typeArguments*/
                void 0, [moduleArg]));
                setOriginalNode(enumStatement, node);
                if (varAdded) {
                    setSyntheticLeadingComments(enumStatement, void 0);
                    setSyntheticTrailingComments(enumStatement, void 0);
                }
                setTextRange(enumStatement, node);
                addEmitFlags(enumStatement, emitFlags);
                statements.push(enumStatement);
                statements.push(factory2.createEndOfDeclarationMarker(node));
                return statements;
            }
            function transformEnumBody(node, localName) {
                const savedCurrentNamespaceLocalName = currentNamespaceContainerName;
                currentNamespaceContainerName = localName;
                const statements = [];
                startLexicalEnvironment();
                const members = map(node.members, transformEnumMember);
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                addRange(statements, members);
                currentNamespaceContainerName = savedCurrentNamespaceLocalName;
                return factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                node.members), 
                /*multiLine*/
                true);
            }
            function transformEnumMember(member) {
                const name = getExpressionForPropertyName(member, 
                /*generateNameForComputedPropertyName*/
                false);
                const valueExpression = transformEnumMemberDeclarationValue(member);
                const innerAssignment = factory2.createAssignment(factory2.createElementAccessExpression(currentNamespaceContainerName, name), valueExpression);
                const outerAssignment = valueExpression.kind === 10 /* StringLiteral */ ? innerAssignment : factory2.createAssignment(factory2.createElementAccessExpression(currentNamespaceContainerName, innerAssignment), name);
                return setTextRange(factory2.createExpressionStatement(setTextRange(outerAssignment, member)), member);
            }
            function transformEnumMemberDeclarationValue(member) {
                const value = resolver.getConstantValue(member);
                if (value !== void 0) {
                    return typeof value === "string" ? factory2.createStringLiteral(value) : factory2.createNumericLiteral(value);
                }
                else {
                    enableSubstitutionForNonQualifiedEnumMembers();
                    if (member.initializer) {
                        return Debug.checkDefined(visitNode(member.initializer, visitor, isExpression));
                    }
                    else {
                        return factory2.createVoidZero();
                    }
                }
            }
            function shouldEmitModuleDeclaration(nodeIn) {
                const node = getParseTreeNode(nodeIn, isModuleDeclaration);
                if (!node) {
                    return true;
                }
                return isInstantiatedModule(node, shouldPreserveConstEnums(compilerOptions));
            }
            function hasNamespaceQualifiedExportName(node) {
                return isExportOfNamespace(node) || isExternalModuleExport(node) && moduleKind !== 5 /* ES2015 */ && moduleKind !== 6 /* ES2020 */ && moduleKind !== 7 /* ES2022 */ && moduleKind !== 99 /* ESNext */ && moduleKind !== 4 /* System */;
            }
            function recordEmittedDeclarationInScope(node) {
                if (!currentScopeFirstDeclarationsOfName) {
                    currentScopeFirstDeclarationsOfName = /* @__PURE__ */ new Map();
                }
                const name = declaredNameInScope(node);
                if (!currentScopeFirstDeclarationsOfName.has(name)) {
                    currentScopeFirstDeclarationsOfName.set(name, node);
                }
            }
            function isFirstEmittedDeclarationInScope(node) {
                if (currentScopeFirstDeclarationsOfName) {
                    const name = declaredNameInScope(node);
                    return currentScopeFirstDeclarationsOfName.get(name) === node;
                }
                return true;
            }
            function declaredNameInScope(node) {
                Debug.assertNode(node.name, isIdentifier);
                return node.name.escapedText;
            }
            function addVarForEnumOrModuleDeclaration(statements, node) {
                const statement = factory2.createVariableStatement(visitNodes2(node.modifiers, modifierVisitor, isModifier), factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(factory2.getLocalName(node, 
                    /*allowComments*/
                    false, 
                    /*allowSourceMaps*/
                    true))
                ], currentLexicalScope.kind === 308 /* SourceFile */ ? 0 /* None */ : 1 /* Let */));
                setOriginalNode(statement, node);
                recordEmittedDeclarationInScope(node);
                if (isFirstEmittedDeclarationInScope(node)) {
                    if (node.kind === 263 /* EnumDeclaration */) {
                        setSourceMapRange(statement.declarationList, node);
                    }
                    else {
                        setSourceMapRange(statement, node);
                    }
                    setCommentRange(statement, node);
                    addEmitFlags(statement, 2048 /* NoTrailingComments */ | 8388608 /* HasEndOfDeclarationMarker */);
                    statements.push(statement);
                    return true;
                }
                else {
                    const mergeMarker = factory2.createMergeDeclarationMarker(statement);
                    setEmitFlags(mergeMarker, 3072 /* NoComments */ | 8388608 /* HasEndOfDeclarationMarker */);
                    statements.push(mergeMarker);
                    return false;
                }
            }
            function visitModuleDeclaration(node) {
                if (!shouldEmitModuleDeclaration(node)) {
                    return factory2.createNotEmittedStatement(node);
                }
                Debug.assertNode(node.name, isIdentifier, "A TypeScript namespace should have an Identifier name.");
                enableSubstitutionForNamespaceExports();
                const statements = [];
                let emitFlags = 4 /* AdviseOnEmitNode */;
                const varAdded = addVarForEnumOrModuleDeclaration(statements, node);
                if (varAdded) {
                    if (moduleKind !== 4 /* System */ || currentLexicalScope !== currentSourceFile) {
                        emitFlags |= 1024 /* NoLeadingComments */;
                    }
                }
                const parameterName = getNamespaceParameterName(node);
                const containerName = getNamespaceContainerName(node);
                const exportName = hasSyntacticModifier(node, 1 /* Export */) ? factory2.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true) : factory2.getLocalName(node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
                let moduleArg = factory2.createLogicalOr(exportName, factory2.createAssignment(exportName, factory2.createObjectLiteralExpression()));
                if (hasNamespaceQualifiedExportName(node)) {
                    const localName = factory2.getLocalName(node, 
                    /*allowComments*/
                    false, 
                    /*allowSourceMaps*/
                    true);
                    moduleArg = factory2.createAssignment(localName, moduleArg);
                }
                const moduleStatement = factory2.createExpressionStatement(factory2.createCallExpression(factory2.createFunctionExpression(
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
                void 0, transformModuleBody(node, containerName)), 
                /*typeArguments*/
                void 0, [moduleArg]));
                setOriginalNode(moduleStatement, node);
                if (varAdded) {
                    setSyntheticLeadingComments(moduleStatement, void 0);
                    setSyntheticTrailingComments(moduleStatement, void 0);
                }
                setTextRange(moduleStatement, node);
                addEmitFlags(moduleStatement, emitFlags);
                statements.push(moduleStatement);
                statements.push(factory2.createEndOfDeclarationMarker(node));
                return statements;
            }
            function transformModuleBody(node, namespaceLocalName) {
                const savedCurrentNamespaceContainerName = currentNamespaceContainerName;
                const savedCurrentNamespace = currentNamespace;
                const savedCurrentScopeFirstDeclarationsOfName = currentScopeFirstDeclarationsOfName;
                currentNamespaceContainerName = namespaceLocalName;
                currentNamespace = node;
                currentScopeFirstDeclarationsOfName = void 0;
                const statements = [];
                startLexicalEnvironment();
                let statementsLocation;
                let blockLocation;
                if (node.body) {
                    if (node.body.kind === 265 /* ModuleBlock */) {
                        saveStateAndInvoke(node.body, (body) => addRange(statements, visitNodes2(body.statements, namespaceElementVisitor, isStatement)));
                        statementsLocation = node.body.statements;
                        blockLocation = node.body;
                    }
                    else {
                        const result = visitModuleDeclaration(node.body);
                        if (result) {
                            if (isArray(result)) {
                                addRange(statements, result);
                            }
                            else {
                                statements.push(result);
                            }
                        }
                        const moduleBlock = getInnerMostModuleDeclarationFromDottedModule(node).body;
                        statementsLocation = moveRangePos(moduleBlock.statements, -1);
                    }
                }
                insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
                currentNamespaceContainerName = savedCurrentNamespaceContainerName;
                currentNamespace = savedCurrentNamespace;
                currentScopeFirstDeclarationsOfName = savedCurrentScopeFirstDeclarationsOfName;
                const block = factory2.createBlock(setTextRange(factory2.createNodeArray(statements), 
                /*location*/
                statementsLocation), 
                /*multiLine*/
                true);
                setTextRange(block, blockLocation);
                if (!node.body || node.body.kind !== 265 /* ModuleBlock */) {
                    setEmitFlags(block, getEmitFlags(block) | 3072 /* NoComments */);
                }
                return block;
            }
            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration) {
                if (moduleDeclaration.body.kind === 264 /* ModuleDeclaration */) {
                    const recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration.body);
                    return recursiveInnerModule || moduleDeclaration.body;
                }
            }
            function visitImportDeclaration(node) {
                if (!node.importClause) {
                    return node;
                }
                if (node.importClause.isTypeOnly) {
                    return void 0;
                }
                const importClause = visitNode(node.importClause, visitImportClause, isImportClause);
                return importClause || compilerOptions.importsNotUsedAsValues === 1 /* Preserve */ || compilerOptions.importsNotUsedAsValues === 2 /* Error */ ? factory2.updateImportDeclaration(node, 
                /*modifiers*/
                void 0, importClause, node.moduleSpecifier, node.assertClause) : void 0;
            }
            function visitImportClause(node) {
                Debug.assert(!node.isTypeOnly);
                const name = shouldEmitAliasDeclaration(node) ? node.name : void 0;
                const namedBindings = visitNode(node.namedBindings, visitNamedImportBindings, isNamedImportBindings);
                return name || namedBindings ? factory2.updateImportClause(node, 
                /*isTypeOnly*/
                false, name, namedBindings) : void 0;
            }
            function visitNamedImportBindings(node) {
                if (node.kind === 271 /* NamespaceImport */) {
                    return shouldEmitAliasDeclaration(node) ? node : void 0;
                }
                else {
                    const allowEmpty = compilerOptions.verbatimModuleSyntax || compilerOptions.preserveValueImports && (compilerOptions.importsNotUsedAsValues === 1 /* Preserve */ || compilerOptions.importsNotUsedAsValues === 2 /* Error */);
                    const elements = visitNodes2(node.elements, visitImportSpecifier, isImportSpecifier);
                    return allowEmpty || some(elements) ? factory2.updateNamedImports(node, elements) : void 0;
                }
            }
            function visitImportSpecifier(node) {
                return !node.isTypeOnly && shouldEmitAliasDeclaration(node) ? node : void 0;
            }
            function visitExportAssignment(node) {
                return compilerOptions.verbatimModuleSyntax || resolver.isValueAliasDeclaration(node) ? visitEachChild(node, visitor, context) : void 0;
            }
            function visitExportDeclaration(node) {
                if (node.isTypeOnly) {
                    return void 0;
                }
                if (!node.exportClause || isNamespaceExport(node.exportClause)) {
                    return node;
                }
                const allowEmpty = compilerOptions.verbatimModuleSyntax || !!node.moduleSpecifier && (compilerOptions.importsNotUsedAsValues === 1 /* Preserve */ || compilerOptions.importsNotUsedAsValues === 2 /* Error */);
                const exportClause = visitNode(node.exportClause, (bindings) => visitNamedExportBindings(bindings, allowEmpty), isNamedExportBindings);
                return exportClause ? factory2.updateExportDeclaration(node, 
                /*modifiers*/
                void 0, node.isTypeOnly, exportClause, node.moduleSpecifier, node.assertClause) : void 0;
            }
            function visitNamedExports(node, allowEmpty) {
                const elements = visitNodes2(node.elements, visitExportSpecifier, isExportSpecifier);
                return allowEmpty || some(elements) ? factory2.updateNamedExports(node, elements) : void 0;
            }
            function visitNamespaceExports(node) {
                return factory2.updateNamespaceExport(node, Debug.checkDefined(visitNode(node.name, visitor, isIdentifier)));
            }
            function visitNamedExportBindings(node, allowEmpty) {
                return isNamespaceExport(node) ? visitNamespaceExports(node) : visitNamedExports(node, allowEmpty);
            }
            function visitExportSpecifier(node) {
                return !node.isTypeOnly && (compilerOptions.verbatimModuleSyntax || resolver.isValueAliasDeclaration(node)) ? node : void 0;
            }
            function shouldEmitImportEqualsDeclaration(node) {
                return shouldEmitAliasDeclaration(node) || !isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportEqualsWithEntityName(node);
            }
            function visitImportEqualsDeclaration(node) {
                if (node.isTypeOnly) {
                    return void 0;
                }
                if (isExternalModuleImportEqualsDeclaration(node)) {
                    const isReferenced = shouldEmitAliasDeclaration(node);
                    if (!isReferenced && compilerOptions.importsNotUsedAsValues === 1 /* Preserve */) {
                        return setOriginalNode(setTextRange(factory2.createImportDeclaration(
                        /*modifiers*/
                        void 0, 
                        /*importClause*/
                        void 0, node.moduleReference.expression, 
                        /*assertClause*/
                        void 0), node), node);
                    }
                    return isReferenced ? visitEachChild(node, visitor, context) : void 0;
                }
                if (!shouldEmitImportEqualsDeclaration(node)) {
                    return void 0;
                }
                const moduleReference = createExpressionFromEntityName(factory2, node.moduleReference);
                setEmitFlags(moduleReference, 3072 /* NoComments */ | 4096 /* NoNestedComments */);
                if (isNamedExternalModuleExport(node) || !isExportOfNamespace(node)) {
                    return setOriginalNode(setTextRange(factory2.createVariableStatement(visitNodes2(node.modifiers, modifierVisitor, isModifier), factory2.createVariableDeclarationList([
                        setOriginalNode(factory2.createVariableDeclaration(node.name, 
                        /*exclamationToken*/
                        void 0, 
                        /*type*/
                        void 0, moduleReference), node)
                    ])), node), node);
                }
                else {
                    return setOriginalNode(createNamespaceExport(node.name, moduleReference, node), node);
                }
            }
            function isExportOfNamespace(node) {
                return currentNamespace !== void 0 && hasSyntacticModifier(node, 1 /* Export */);
            }
            function isExternalModuleExport(node) {
                return currentNamespace === void 0 && hasSyntacticModifier(node, 1 /* Export */);
            }
            function isNamedExternalModuleExport(node) {
                return isExternalModuleExport(node) && !hasSyntacticModifier(node, 1024 /* Default */);
            }
            function isDefaultExternalModuleExport(node) {
                return isExternalModuleExport(node) && hasSyntacticModifier(node, 1024 /* Default */);
            }
            function createExportMemberAssignmentStatement(node) {
                const expression = factory2.createAssignment(factory2.getExternalModuleOrNamespaceExportName(currentNamespaceContainerName, node, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true), factory2.getLocalName(node));
                setSourceMapRange(expression, createRange(node.name ? node.name.pos : node.pos, node.end));
                const statement = factory2.createExpressionStatement(expression);
                setSourceMapRange(statement, createRange(-1, node.end));
                return statement;
            }
            function addExportMemberAssignment(statements, node) {
                statements.push(createExportMemberAssignmentStatement(node));
            }
            function createNamespaceExport(exportName, exportValue, location) {
                return setTextRange(factory2.createExpressionStatement(factory2.createAssignment(factory2.getNamespaceMemberName(currentNamespaceContainerName, exportName, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true), exportValue)), location);
            }
            function createNamespaceExportExpression(exportName, exportValue, location) {
                return setTextRange(factory2.createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(exportName), exportValue), location);
            }
            function getNamespaceMemberNameWithSourceMapsAndWithoutComments(name) {
                return factory2.getNamespaceMemberName(currentNamespaceContainerName, name, 
                /*allowComments*/
                false, 
                /*allowSourceMaps*/
                true);
            }
            function getNamespaceParameterName(node) {
                const name = factory2.getGeneratedNameForNode(node);
                setSourceMapRange(name, node.name);
                return name;
            }
            function getNamespaceContainerName(node) {
                return factory2.getGeneratedNameForNode(node);
            }
            function enableSubstitutionForNonQualifiedEnumMembers() {
                if ((enabledSubstitutions & 8 /* NonQualifiedEnumMembers */) === 0) {
                    enabledSubstitutions |= 8 /* NonQualifiedEnumMembers */;
                    context.enableSubstitution(79 /* Identifier */);
                }
            }
            function enableSubstitutionForNamespaceExports() {
                if ((enabledSubstitutions & 2 /* NamespaceExports */) === 0) {
                    enabledSubstitutions |= 2 /* NamespaceExports */;
                    context.enableSubstitution(79 /* Identifier */);
                    context.enableSubstitution(300 /* ShorthandPropertyAssignment */);
                    context.enableEmitNotification(264 /* ModuleDeclaration */);
                }
            }
            function isTransformedModuleDeclaration(node) {
                return getOriginalNode(node).kind === 264 /* ModuleDeclaration */;
            }
            function isTransformedEnumDeclaration(node) {
                return getOriginalNode(node).kind === 263 /* EnumDeclaration */;
            }
            function onEmitNode(hint, node, emitCallback) {
                const savedApplicableSubstitutions = applicableSubstitutions;
                const savedCurrentSourceFile = currentSourceFile;
                if (isSourceFile(node)) {
                    currentSourceFile = node;
                }
                if (enabledSubstitutions & 2 /* NamespaceExports */ && isTransformedModuleDeclaration(node)) {
                    applicableSubstitutions |= 2 /* NamespaceExports */;
                }
                if (enabledSubstitutions & 8 /* NonQualifiedEnumMembers */ && isTransformedEnumDeclaration(node)) {
                    applicableSubstitutions |= 8 /* NonQualifiedEnumMembers */;
                }
                previousOnEmitNode(hint, node, emitCallback);
                applicableSubstitutions = savedApplicableSubstitutions;
                currentSourceFile = savedCurrentSourceFile;
            }
            function onSubstituteNode(hint, node) {
                node = previousOnSubstituteNode(hint, node);
                if (hint === 1 /* Expression */) {
                    return substituteExpression(node);
                }
                else if (isShorthandPropertyAssignment(node)) {
                    return substituteShorthandPropertyAssignment(node);
                }
                return node;
            }
            function substituteShorthandPropertyAssignment(node) {
                if (enabledSubstitutions & 2 /* NamespaceExports */) {
                    const name = node.name;
                    const exportedName = trySubstituteNamespaceExportedName(name);
                    if (exportedName) {
                        if (node.objectAssignmentInitializer) {
                            const initializer = factory2.createAssignment(exportedName, node.objectAssignmentInitializer);
                            return setTextRange(factory2.createPropertyAssignment(name, initializer), node);
                        }
                        return setTextRange(factory2.createPropertyAssignment(name, exportedName), node);
                    }
                }
                return node;
            }
            function substituteExpression(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return substituteExpressionIdentifier(node);
                    case 208 /* PropertyAccessExpression */:
                        return substitutePropertyAccessExpression(node);
                    case 209 /* ElementAccessExpression */:
                        return substituteElementAccessExpression(node);
                }
                return node;
            }
            function substituteExpressionIdentifier(node) {
                return trySubstituteNamespaceExportedName(node) || node;
            }
            function trySubstituteNamespaceExportedName(node) {
                if (enabledSubstitutions & applicableSubstitutions && !isGeneratedIdentifier(node) && !isLocalName(node)) {
                    const container = resolver.getReferencedExportContainer(node, 
                    /*prefixLocals*/
                    false);
                    if (container && container.kind !== 308 /* SourceFile */) {
                        const substitute = applicableSubstitutions & 2 /* NamespaceExports */ && container.kind === 264 /* ModuleDeclaration */ || applicableSubstitutions & 8 /* NonQualifiedEnumMembers */ && container.kind === 263 /* EnumDeclaration */;
                        if (substitute) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(container), node), 
                            /*location*/
                            node);
                        }
                    }
                }
                return void 0;
            }
            function substitutePropertyAccessExpression(node) {
                return substituteConstantValue(node);
            }
            function substituteElementAccessExpression(node) {
                return substituteConstantValue(node);
            }
            function safeMultiLineComment(value) {
                return value.replace(/\*\//g, "*_/");
            }
            function substituteConstantValue(node) {
                const constantValue = tryGetConstEnumValue(node);
                if (constantValue !== void 0) {
                    setConstantValue(node, constantValue);
                    const substitute = typeof constantValue === "string" ? factory2.createStringLiteral(constantValue) : factory2.createNumericLiteral(constantValue);
                    if (!compilerOptions.removeComments) {
                        const originalNode = getOriginalNode(node, isAccessExpression);
                        addSyntheticTrailingComment(substitute, 3 /* MultiLineCommentTrivia */, ` ${safeMultiLineComment(getTextOfNode(originalNode))} `);
                    }
                    return substitute;
                }
                return node;
            }
            function tryGetConstEnumValue(node) {
                if (getIsolatedModules(compilerOptions)) {
                    return void 0;
                }
                return isPropertyAccessExpression(node) || isElementAccessExpression(node) ? resolver.getConstantValue(node) : void 0;
            }
            function shouldEmitAliasDeclaration(node) {
                return compilerOptions.verbatimModuleSyntax || isInJSFile(node) || (compilerOptions.preserveValueImports ? resolver.isValueAliasDeclaration(node) : resolver.isReferencedAliasDeclaration(node));
            }
        }