function addNewNodeForMemberSymbol(symbol, enclosingDeclaration, sourceFile, context, preferences, importAdder, addClassElement, body, preserveOptional = 3 /* All */, isAmbient = false) {
            var _a2;
            const declarations = symbol.getDeclarations();
            const declaration = declarations == null ? void 0 : declarations[0];
            const checker = context.program.getTypeChecker();
            const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
            const kind = (_a2 = declaration == null ? void 0 : declaration.kind) != null ? _a2 : 168 /* PropertySignature */;
            const declarationName = getSynthesizedDeepClone(getNameOfDeclaration(declaration), 
            /*includeTrivia*/
            false);
            const effectiveModifierFlags = declaration ? getEffectiveModifierFlags(declaration) : 0 /* None */;
            let modifierFlags = effectiveModifierFlags & 4 /* Public */ ? 4 /* Public */ : effectiveModifierFlags & 16 /* Protected */ ? 16 /* Protected */ : 0 /* None */;
            if (declaration && isAutoAccessorPropertyDeclaration(declaration)) {
                modifierFlags |= 128 /* Accessor */;
            }
            const modifiers = createModifiers();
            const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
            const optional = !!(symbol.flags & 16777216 /* Optional */);
            const ambient = !!(enclosingDeclaration.flags & 16777216 /* Ambient */) || isAmbient;
            const quotePreference = getQuotePreference(sourceFile, preferences);
            switch (kind) {
                case 168 /* PropertySignature */:
                case 169 /* PropertyDeclaration */:
                    const flags = quotePreference === 0 /* Single */ ? 268435456 /* UseSingleQuotesForStringLiteralType */ : void 0;
                    let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context));
                    if (importAdder) {
                        const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                        if (importableReference) {
                            typeNode = importableReference.typeNode;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    addClassElement(factory.createPropertyDeclaration(modifiers, declaration ? createName(declarationName) : symbol.getName(), optional && preserveOptional & 2 /* Property */ ? factory.createToken(57 /* QuestionToken */) : void 0, typeNode, 
                    /*initializer*/
                    void 0));
                    break;
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */: {
                    Debug.assertIsDefined(declarations);
                    let typeNode2 = checker.typeToTypeNode(type, enclosingDeclaration, 
                    /*flags*/
                    void 0, getNoopSymbolTrackerWithResolver(context));
                    const allAccessors = getAllAccessorDeclarations(declarations, declaration);
                    const orderedAccessors = allAccessors.secondAccessor ? [allAccessors.firstAccessor, allAccessors.secondAccessor] : [allAccessors.firstAccessor];
                    if (importAdder) {
                        const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode2, scriptTarget);
                        if (importableReference) {
                            typeNode2 = importableReference.typeNode;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    for (const accessor of orderedAccessors) {
                        if (isGetAccessorDeclaration(accessor)) {
                            addClassElement(factory.createGetAccessorDeclaration(modifiers, createName(declarationName), emptyArray, createTypeNode(typeNode2), createBody(body, quotePreference, ambient)));
                        }
                        else {
                            Debug.assertNode(accessor, isSetAccessorDeclaration, "The counterpart to a getter should be a setter");
                            const parameter = getSetAccessorValueParameter(accessor);
                            const parameterName = parameter && isIdentifier(parameter.name) ? idText(parameter.name) : void 0;
                            addClassElement(factory.createSetAccessorDeclaration(modifiers, createName(declarationName), createDummyParameters(1, [parameterName], [createTypeNode(typeNode2)], 1, 
                            /*inJs*/
                            false), createBody(body, quotePreference, ambient)));
                        }
                    }
                    break;
                }
                case 170 /* MethodSignature */:
                case 171 /* MethodDeclaration */:
                    Debug.assertIsDefined(declarations);
                    const signatures = type.isUnion() ? flatMap(type.types, (t) => t.getCallSignatures()) : type.getCallSignatures();
                    if (!some(signatures)) {
                        break;
                    }
                    if (declarations.length === 1) {
                        Debug.assert(signatures.length === 1, "One declaration implies one signature");
                        const signature = signatures[0];
                        outputMethod(quotePreference, signature, modifiers, createName(declarationName), createBody(body, quotePreference, ambient));
                        break;
                    }
                    for (const signature of signatures) {
                        outputMethod(quotePreference, signature, modifiers, createName(declarationName));
                    }
                    if (!ambient) {
                        if (declarations.length > signatures.length) {
                            const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1]);
                            outputMethod(quotePreference, signature, modifiers, createName(declarationName), createBody(body, quotePreference));
                        }
                        else {
                            Debug.assert(declarations.length === signatures.length, "Declarations and signatures should match count");
                            addClassElement(createMethodImplementingSignatures(checker, context, enclosingDeclaration, signatures, createName(declarationName), optional && !!(preserveOptional & 1 /* Method */), modifiers, quotePreference, body));
                        }
                    }
                    break;
            }
            function outputMethod(quotePreference2, signature, modifiers2, name, body2) {
                const method = createSignatureDeclarationFromSignature(171 /* MethodDeclaration */, context, quotePreference2, signature, body2, name, modifiers2, optional && !!(preserveOptional & 1 /* Method */), enclosingDeclaration, importAdder);
                if (method)
                    addClassElement(method);
            }
            function createModifiers() {
                let modifiers2;
                if (modifierFlags) {
                    modifiers2 = combine(modifiers2, factory.createModifiersFromModifierFlags(modifierFlags));
                }
                if (shouldAddOverrideKeyword()) {
                    modifiers2 = append(modifiers2, factory.createToken(161 /* OverrideKeyword */));
                }
                return modifiers2 && factory.createNodeArray(modifiers2);
            }
            function shouldAddOverrideKeyword() {
                return !!(context.program.getCompilerOptions().noImplicitOverride && declaration && hasAbstractModifier(declaration));
            }
            function createName(node) {
                if (isIdentifier(node) && node.escapedText === "constructor") {
                    return factory.createComputedPropertyName(factory.createStringLiteral(idText(node), quotePreference === 0 /* Single */));
                }
                return getSynthesizedDeepClone(node, 
                /*includeTrivia*/
                false);
            }
            function createBody(block, quotePreference2, ambient2) {
                return ambient2 ? void 0 : getSynthesizedDeepClone(block, 
                /*includeTrivia*/
                false) || createStubbedMethodBody(quotePreference2);
            }
            function createTypeNode(typeNode) {
                return getSynthesizedDeepClone(typeNode, 
                /*includeTrivia*/
                false);
            }
        }