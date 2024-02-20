function createObjectLiteralMethod(symbol, enclosingDeclaration, sourceFile, program, host, preferences) {
            const declarations = symbol.getDeclarations();
            if (!(declarations && declarations.length)) {
                return void 0;
            }
            const checker = program.getTypeChecker();
            const declaration = declarations[0];
            const name = getSynthesizedDeepClone(getNameOfDeclaration(declaration), 
            /*includeTrivia*/
            false);
            const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
            const quotePreference = getQuotePreference(sourceFile, preferences);
            const builderFlags = 33554432 /* OmitThisParameter */ | (quotePreference === 0 /* Single */ ? 268435456 /* UseSingleQuotesForStringLiteralType */ : 0 /* None */);
            switch (declaration.kind) {
                case 168 /* PropertySignature */:
                case 169 /* PropertyDeclaration */:
                case 170 /* MethodSignature */:
                case 171 /* MethodDeclaration */: {
                    let effectiveType = type.flags & 1048576 /* Union */ && type.types.length < 10 ? checker.getUnionType(type.types, 2 /* Subtype */) : type;
                    if (effectiveType.flags & 1048576 /* Union */) {
                        const functionTypes = filter(effectiveType.types, (type2) => checker.getSignaturesOfType(type2, 0 /* Call */).length > 0);
                        if (functionTypes.length === 1) {
                            effectiveType = functionTypes[0];
                        }
                        else {
                            return void 0;
                        }
                    }
                    const signatures = checker.getSignaturesOfType(effectiveType, 0 /* Call */);
                    if (signatures.length !== 1) {
                        return void 0;
                    }
                    const typeNode = checker.typeToTypeNode(effectiveType, enclosingDeclaration, builderFlags, ts_codefix_exports.getNoopSymbolTrackerWithResolver({ program, host }));
                    if (!typeNode || !isFunctionTypeNode(typeNode)) {
                        return void 0;
                    }
                    let body;
                    if (preferences.includeCompletionsWithSnippetText) {
                        const emptyStmt = factory.createEmptyStatement();
                        body = factory.createBlock([emptyStmt], 
                        /* multiline */
                        true);
                        setSnippetElement(emptyStmt, { kind: 0 /* TabStop */, order: 0 });
                    }
                    else {
                        body = factory.createBlock([], 
                        /* multiline */
                        true);
                    }
                    const parameters = typeNode.parameters.map((typedParam) => factory.createParameterDeclaration(
                    /*modifiers*/
                    void 0, typedParam.dotDotDotToken, typedParam.name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, typedParam.initializer));
                    return factory.createMethodDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*asteriskToken*/
                    void 0, name, 
                    /*questionToken*/
                    void 0, 
                    /*typeParameters*/
                    void 0, parameters, 
                    /*type*/
                    void 0, body);
                }
                default:
                    return void 0;
            }
        }