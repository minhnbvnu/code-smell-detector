function checkFunctionOrConstructorSymbolWorker(symbol) {
                function getCanonicalOverload(overloads, implementation) {
                    const implementationSharesContainerWithFirstOverload = implementation !== void 0 && implementation.parent === overloads[0].parent;
                    return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
                }
                function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck2, someOverloadFlags, allOverloadFlags) {
                    const someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                    if (someButNotAllOverloadFlags !== 0) {
                        const canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck2);
                        forEach(overloads, (o) => {
                            const deviation = getEffectiveDeclarationFlags(o, flagsToCheck2) ^ canonicalFlags;
                            if (deviation & 1 /* Export */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_exported_or_non_exported);
                            }
                            else if (deviation & 2 /* Ambient */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                            }
                            else if (deviation & (8 /* Private */ | 16 /* Protected */)) {
                                error(getNameOfDeclaration(o) || o, Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                            }
                            else if (deviation & 256 /* Abstract */) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_abstract_or_non_abstract);
                            }
                        });
                    }
                }
                function checkQuestionTokenAgreementBetweenOverloads(overloads, implementation, someHaveQuestionToken2, allHaveQuestionToken2) {
                    if (someHaveQuestionToken2 !== allHaveQuestionToken2) {
                        const canonicalHasQuestionToken = hasQuestionToken(getCanonicalOverload(overloads, implementation));
                        forEach(overloads, (o) => {
                            const deviation = hasQuestionToken(o) !== canonicalHasQuestionToken;
                            if (deviation) {
                                error(getNameOfDeclaration(o), Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                            }
                        });
                    }
                }
                const flagsToCheck = 1 /* Export */ | 2 /* Ambient */ | 8 /* Private */ | 16 /* Protected */ | 256 /* Abstract */;
                let someNodeFlags = 0 /* None */;
                let allNodeFlags = flagsToCheck;
                let someHaveQuestionToken = false;
                let allHaveQuestionToken = true;
                let hasOverloads = false;
                let bodyDeclaration;
                let lastSeenNonAmbientDeclaration;
                let previousDeclaration;
                const declarations = symbol.declarations;
                const isConstructor = (symbol.flags & 16384 /* Constructor */) !== 0;
                function reportImplementationExpectedError(node) {
                    if (node.name && nodeIsMissing(node.name)) {
                        return;
                    }
                    let seen = false;
                    const subsequentNode = forEachChild(node.parent, (c) => {
                        if (seen) {
                            return c;
                        }
                        else {
                            seen = c === node;
                        }
                    });
                    if (subsequentNode && subsequentNode.pos === node.end) {
                        if (subsequentNode.kind === node.kind) {
                            const errorNode2 = subsequentNode.name || subsequentNode;
                            const subsequentName = subsequentNode.name;
                            if (node.name && subsequentName && // both are private identifiers
                                (isPrivateIdentifier(node.name) && isPrivateIdentifier(subsequentName) && node.name.escapedText === subsequentName.escapedText || // Both are computed property names
                                    // TODO: GH#17345: These are methods, so handle computed name case. (`Always allowing computed property names is *not* the correct behavior!)
                                    isComputedPropertyName(node.name) && isComputedPropertyName(subsequentName) || // Both are literal property names that are the same.
                                    isPropertyNameLiteral(node.name) && isPropertyNameLiteral(subsequentName) && getEscapedTextOfIdentifierOrLiteral(node.name) === getEscapedTextOfIdentifierOrLiteral(subsequentName))) {
                                const reportError = (node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */) && isStatic(node) !== isStatic(subsequentNode);
                                if (reportError) {
                                    const diagnostic = isStatic(node) ? Diagnostics.Function_overload_must_be_static : Diagnostics.Function_overload_must_not_be_static;
                                    error(errorNode2, diagnostic);
                                }
                                return;
                            }
                            if (nodeIsPresent(subsequentNode.body)) {
                                error(errorNode2, Diagnostics.Function_implementation_name_must_be_0, declarationNameToString(node.name));
                                return;
                            }
                        }
                    }
                    const errorNode = node.name || node;
                    if (isConstructor) {
                        error(errorNode, Diagnostics.Constructor_implementation_is_missing);
                    }
                    else {
                        if (hasSyntacticModifier(node, 256 /* Abstract */)) {
                            error(errorNode, Diagnostics.All_declarations_of_an_abstract_method_must_be_consecutive);
                        }
                        else {
                            error(errorNode, Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                        }
                    }
                }
                let duplicateFunctionDeclaration = false;
                let multipleConstructorImplementation = false;
                let hasNonAmbientClass = false;
                const functionDeclarations = [];
                if (declarations) {
                    for (const current of declarations) {
                        const node = current;
                        const inAmbientContext = node.flags & 16777216 /* Ambient */;
                        const inAmbientContextOrInterface = node.parent && (node.parent.kind === 261 /* InterfaceDeclaration */ || node.parent.kind === 184 /* TypeLiteral */) || inAmbientContext;
                        if (inAmbientContextOrInterface) {
                            previousDeclaration = void 0;
                        }
                        if ((node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */) && !inAmbientContext) {
                            hasNonAmbientClass = true;
                        }
                        if (node.kind === 259 /* FunctionDeclaration */ || node.kind === 171 /* MethodDeclaration */ || node.kind === 170 /* MethodSignature */ || node.kind === 173 /* Constructor */) {
                            functionDeclarations.push(node);
                            const currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                            someNodeFlags |= currentNodeFlags;
                            allNodeFlags &= currentNodeFlags;
                            someHaveQuestionToken = someHaveQuestionToken || hasQuestionToken(node);
                            allHaveQuestionToken = allHaveQuestionToken && hasQuestionToken(node);
                            const bodyIsPresent = nodeIsPresent(node.body);
                            if (bodyIsPresent && bodyDeclaration) {
                                if (isConstructor) {
                                    multipleConstructorImplementation = true;
                                }
                                else {
                                    duplicateFunctionDeclaration = true;
                                }
                            }
                            else if ((previousDeclaration == null ? void 0 : previousDeclaration.parent) === node.parent && previousDeclaration.end !== node.pos) {
                                reportImplementationExpectedError(previousDeclaration);
                            }
                            if (bodyIsPresent) {
                                if (!bodyDeclaration) {
                                    bodyDeclaration = node;
                                }
                            }
                            else {
                                hasOverloads = true;
                            }
                            previousDeclaration = node;
                            if (!inAmbientContextOrInterface) {
                                lastSeenNonAmbientDeclaration = node;
                            }
                        }
                        if (isInJSFile(current) && isFunctionLike(current) && current.jsDoc) {
                            for (const node2 of current.jsDoc) {
                                if (node2.tags) {
                                    for (const tag of node2.tags) {
                                        if (isJSDocOverloadTag(tag)) {
                                            hasOverloads = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (multipleConstructorImplementation) {
                    forEach(functionDeclarations, (declaration) => {
                        error(declaration, Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                    });
                }
                if (duplicateFunctionDeclaration) {
                    forEach(functionDeclarations, (declaration) => {
                        error(getNameOfDeclaration(declaration) || declaration, Diagnostics.Duplicate_function_implementation);
                    });
                }
                if (hasNonAmbientClass && !isConstructor && symbol.flags & 16 /* Function */ && declarations) {
                    const relatedDiagnostics = filter(declarations, (d) => d.kind === 260 /* ClassDeclaration */).map((d) => createDiagnosticForNode(d, Diagnostics.Consider_adding_a_declare_modifier_to_this_class));
                    forEach(declarations, (declaration) => {
                        const diagnostic = declaration.kind === 260 /* ClassDeclaration */ ? Diagnostics.Class_declaration_cannot_implement_overload_list_for_0 : declaration.kind === 259 /* FunctionDeclaration */ ? Diagnostics.Function_with_bodies_can_only_merge_with_classes_that_are_ambient : void 0;
                        if (diagnostic) {
                            addRelatedInfo(error(getNameOfDeclaration(declaration) || declaration, diagnostic, symbolName(symbol)), ...relatedDiagnostics);
                        }
                    });
                }
                if (lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body && !hasSyntacticModifier(lastSeenNonAmbientDeclaration, 256 /* Abstract */) && !lastSeenNonAmbientDeclaration.questionToken) {
                    reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
                }
                if (hasOverloads) {
                    if (declarations) {
                        checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                        checkQuestionTokenAgreementBetweenOverloads(declarations, bodyDeclaration, someHaveQuestionToken, allHaveQuestionToken);
                    }
                    if (bodyDeclaration) {
                        const signatures = getSignaturesOfSymbol(symbol);
                        const bodySignature = getSignatureFromDeclaration(bodyDeclaration);
                        for (const signature of signatures) {
                            if (!isImplementationCompatibleWithOverload(bodySignature, signature)) {
                                const errorNode = signature.declaration && isJSDocSignature(signature.declaration) ? signature.declaration.parent.tagName : signature.declaration;
                                addRelatedInfo(error(errorNode, Diagnostics.This_overload_signature_is_not_compatible_with_its_implementation_signature), createDiagnosticForNode(bodyDeclaration, Diagnostics.The_implementation_signature_is_declared_here));
                                break;
                            }
                        }
                    }
                }
            }