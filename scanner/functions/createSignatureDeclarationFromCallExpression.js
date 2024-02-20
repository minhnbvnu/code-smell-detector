function createSignatureDeclarationFromCallExpression(kind, context, importAdder, call, name, modifierFlags, contextNode) {
            const quotePreference = getQuotePreference(context.sourceFile, context.preferences);
            const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
            const tracker = getNoopSymbolTrackerWithResolver(context);
            const checker = context.program.getTypeChecker();
            const isJs = isInJSFile(contextNode);
            const { typeArguments, arguments: args, parent: parent2 } = call;
            const contextualType = isJs ? void 0 : checker.getContextualType(call);
            const names = map(args, (arg) => isIdentifier(arg) ? arg.text : isPropertyAccessExpression(arg) && isIdentifier(arg.name) ? arg.name.text : void 0);
            const instanceTypes = isJs ? [] : map(args, (arg) => checker.getTypeAtLocation(arg));
            const { argumentTypeNodes, argumentTypeParameters } = getArgumentTypesAndTypeParameters(checker, importAdder, instanceTypes, contextNode, scriptTarget, 
            /*flags*/
            void 0, tracker);
            const modifiers = modifierFlags ? factory.createNodeArray(factory.createModifiersFromModifierFlags(modifierFlags)) : void 0;
            const asteriskToken = isYieldExpression(parent2) ? factory.createToken(41 /* AsteriskToken */) : void 0;
            const typeParameters = isJs ? void 0 : createTypeParametersForArguments(checker, argumentTypeParameters, typeArguments);
            const parameters = createDummyParameters(args.length, names, argumentTypeNodes, 
            /*minArgumentCount*/
            void 0, isJs);
            const type = isJs || contextualType === void 0 ? void 0 : checker.typeToTypeNode(contextualType, contextNode, 
            /*flags*/
            void 0, tracker);
            switch (kind) {
                case 171 /* MethodDeclaration */:
                    return factory.createMethodDeclaration(modifiers, asteriskToken, name, 
                    /*questionToken*/
                    void 0, typeParameters, parameters, type, createStubbedMethodBody(quotePreference));
                case 170 /* MethodSignature */:
                    return factory.createMethodSignature(modifiers, name, 
                    /*questionToken*/
                    void 0, typeParameters, parameters, type === void 0 ? factory.createKeywordTypeNode(157 /* UnknownKeyword */) : type);
                case 259 /* FunctionDeclaration */:
                    return factory.createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, createStubbedBody(Diagnostics.Function_not_implemented.message, quotePreference));
                default:
                    Debug.fail("Unexpected kind");
            }
        }