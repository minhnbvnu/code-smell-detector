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