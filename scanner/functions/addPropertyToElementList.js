function addPropertyToElementList(propertySymbol, context, typeElements) {
                    var _a2;
                    const propertyIsReverseMapped = !!(getCheckFlags(propertySymbol) & 8192 /* ReverseMapped */);
                    const propertyType = shouldUsePlaceholderForProperty(propertySymbol, context) ? anyType : getNonMissingTypeOfSymbol(propertySymbol);
                    const saveEnclosingDeclaration = context.enclosingDeclaration;
                    context.enclosingDeclaration = void 0;
                    if (context.tracker.canTrackSymbol && isLateBoundName(propertySymbol.escapedName)) {
                        if (propertySymbol.declarations) {
                            const decl = first(propertySymbol.declarations);
                            if (hasLateBindableName(decl)) {
                                if (isBinaryExpression(decl)) {
                                    const name = getNameOfDeclaration(decl);
                                    if (name && isElementAccessExpression(name) && isPropertyAccessEntityNameExpression(name.argumentExpression)) {
                                        trackComputedName(name.argumentExpression, saveEnclosingDeclaration, context);
                                    }
                                }
                                else {
                                    trackComputedName(decl.name.expression, saveEnclosingDeclaration, context);
                                }
                            }
                        }
                        else {
                            context.tracker.reportNonSerializableProperty(symbolToString(propertySymbol));
                        }
                    }
                    context.enclosingDeclaration = propertySymbol.valueDeclaration || ((_a2 = propertySymbol.declarations) == null ? void 0 : _a2[0]) || saveEnclosingDeclaration;
                    const propertyName = getPropertyNameNodeForSymbol(propertySymbol, context);
                    context.enclosingDeclaration = saveEnclosingDeclaration;
                    context.approximateLength += symbolName(propertySymbol).length + 1;
                    const optionalToken = propertySymbol.flags & 16777216 /* Optional */ ? factory.createToken(57 /* QuestionToken */) : void 0;
                    if (propertySymbol.flags & (16 /* Function */ | 8192 /* Method */) && !getPropertiesOfObjectType(propertyType).length && !isReadonlySymbol(propertySymbol)) {
                        const signatures = getSignaturesOfType(filterType(propertyType, (t) => !(t.flags & 32768 /* Undefined */)), 0 /* Call */);
                        for (const signature of signatures) {
                            const methodDeclaration = signatureToSignatureDeclarationHelper(signature, 170 /* MethodSignature */, context, { name: propertyName, questionToken: optionalToken });
                            typeElements.push(preserveCommentsOn(methodDeclaration));
                        }
                    }
                    else {
                        let propertyTypeNode;
                        if (shouldUsePlaceholderForProperty(propertySymbol, context)) {
                            propertyTypeNode = createElidedInformationPlaceholder(context);
                        }
                        else {
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack || (context.reverseMappedStack = []);
                                context.reverseMappedStack.push(propertySymbol);
                            }
                            propertyTypeNode = propertyType ? serializeTypeForDeclaration(context, propertyType, propertySymbol, saveEnclosingDeclaration) : factory.createKeywordTypeNode(131 /* AnyKeyword */);
                            if (propertyIsReverseMapped) {
                                context.reverseMappedStack.pop();
                            }
                        }
                        const modifiers = isReadonlySymbol(propertySymbol) ? [factory.createToken(146 /* ReadonlyKeyword */)] : void 0;
                        if (modifiers) {
                            context.approximateLength += 9;
                        }
                        const propertySignature = factory.createPropertySignature(modifiers, propertyName, optionalToken, propertyTypeNode);
                        typeElements.push(preserveCommentsOn(propertySignature));
                    }
                    function preserveCommentsOn(node) {
                        var _a3;
                        if (some(propertySymbol.declarations, (d) => d.kind === 351 /* JSDocPropertyTag */)) {
                            const d = (_a3 = propertySymbol.declarations) == null ? void 0 : _a3.find((d2) => d2.kind === 351 /* JSDocPropertyTag */);
                            const commentText = getTextOfJSDocComment(d.comment);
                            if (commentText) {
                                setSyntheticLeadingComments(node, [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]);
                            }
                        }
                        else if (propertySymbol.valueDeclaration) {
                            setCommentRange(node, propertySymbol.valueDeclaration);
                        }
                        return node;
                    }
                }