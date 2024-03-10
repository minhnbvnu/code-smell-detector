function getStringLiteralCompletionEntries(sourceFile, node, position, typeChecker, compilerOptions, host, preferences) {
            const parent2 = walkUpParentheses(node.parent);
            switch (parent2.kind) {
                case 198 /* LiteralType */: {
                    const grandParent = walkUpParentheses(parent2.parent);
                    switch (grandParent.kind) {
                        case 230 /* ExpressionWithTypeArguments */:
                        case 180 /* TypeReference */: {
                            const typeArgument = findAncestor(parent2, (n) => n.parent === grandParent);
                            if (typeArgument) {
                                return { kind: 2 /* Types */, types: getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(typeArgument)), isNewIdentifier: false };
                            }
                            return void 0;
                        }
                        case 196 /* IndexedAccessType */:
                            const { indexType, objectType } = grandParent;
                            if (!rangeContainsPosition(indexType, position)) {
                                return void 0;
                            }
                            return stringLiteralCompletionsFromProperties(typeChecker.getTypeFromTypeNode(objectType));
                        case 202 /* ImportType */:
                            return { kind: 0 /* Paths */, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker, preferences) };
                        case 189 /* UnionType */: {
                            if (!isTypeReferenceNode(grandParent.parent)) {
                                return void 0;
                            }
                            const alreadyUsedTypes = getAlreadyUsedTypesInStringLiteralUnion(grandParent, parent2);
                            const types = getStringLiteralTypes(typeChecker.getTypeArgumentConstraint(grandParent)).filter((t) => !contains(alreadyUsedTypes, t.value));
                            return { kind: 2 /* Types */, types, isNewIdentifier: false };
                        }
                        default:
                            return void 0;
                    }
                }
                case 299 /* PropertyAssignment */:
                    if (isObjectLiteralExpression(parent2.parent) && parent2.name === node) {
                        return stringLiteralCompletionsForObjectLiteral(typeChecker, parent2.parent);
                    }
                    return fromContextualType() || fromContextualType(0 /* None */);
                case 209 /* ElementAccessExpression */: {
                    const { expression, argumentExpression } = parent2;
                    if (node === skipParentheses(argumentExpression)) {
                        return stringLiteralCompletionsFromProperties(typeChecker.getTypeAtLocation(expression));
                    }
                    return void 0;
                }
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                case 288 /* JsxAttribute */:
                    if (!isRequireCallArgument(node) && !isImportCall(parent2)) {
                        const argumentInfo = ts_SignatureHelp_exports.getArgumentInfoForCompletions(parent2.kind === 288 /* JsxAttribute */ ? parent2.parent : node, position, sourceFile);
                        return argumentInfo && getStringLiteralCompletionsFromSignature(argumentInfo.invocation, node, argumentInfo, typeChecker) || fromContextualType();
                    }
                case 269 /* ImportDeclaration */:
                case 275 /* ExportDeclaration */:
                case 280 /* ExternalModuleReference */:
                    return { kind: 0 /* Paths */, paths: getStringLiteralCompletionsFromModuleNames(sourceFile, node, compilerOptions, host, typeChecker, preferences) };
                case 292 /* CaseClause */:
                    const tracker = newCaseClauseTracker(typeChecker, parent2.parent.clauses);
                    const contextualTypes = fromContextualType();
                    if (!contextualTypes) {
                        return;
                    }
                    const literals = contextualTypes.types.filter((literal) => !tracker.hasValue(literal.value));
                    return { kind: 2 /* Types */, types: literals, isNewIdentifier: false };
                default:
                    return fromContextualType() || fromContextualType(0 /* None */);
            }
            function fromContextualType(contextFlags = 4 /* Completions */) {
                const types = getStringLiteralTypes(getContextualTypeFromParent(node, typeChecker, contextFlags));
                if (!types.length) {
                    return;
                }
                return { kind: 2 /* Types */, types, isNewIdentifier: false };
            }
        }