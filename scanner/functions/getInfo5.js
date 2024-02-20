function getInfo5(sourceFile, pos, context, errorCode) {
            const node = getTokenAtPosition(sourceFile, pos);
            const parent2 = node.parent;
            if ((errorCode === Diagnostics.No_overload_matches_this_call.code || errorCode === Diagnostics.Type_0_is_not_assignable_to_type_1.code) && !isJsxAttribute(parent2))
                return void 0;
            const checker = context.program.getTypeChecker();
            let suggestedSymbol;
            if (isPropertyAccessExpression(parent2) && parent2.name === node) {
                Debug.assert(isMemberName(node), "Expected an identifier for spelling (property access)");
                let containingType = checker.getTypeAtLocation(parent2.expression);
                if (parent2.flags & 32 /* OptionalChain */) {
                    containingType = checker.getNonNullableType(containingType);
                }
                suggestedSymbol = checker.getSuggestedSymbolForNonexistentProperty(node, containingType);
            }
            else if (isBinaryExpression(parent2) && parent2.operatorToken.kind === 101 /* InKeyword */ && parent2.left === node && isPrivateIdentifier(node)) {
                const receiverType = checker.getTypeAtLocation(parent2.right);
                suggestedSymbol = checker.getSuggestedSymbolForNonexistentProperty(node, receiverType);
            }
            else if (isQualifiedName(parent2) && parent2.right === node) {
                const symbol = checker.getSymbolAtLocation(parent2.left);
                if (symbol && symbol.flags & 1536 /* Module */) {
                    suggestedSymbol = checker.getSuggestedSymbolForNonexistentModule(parent2.right, symbol);
                }
            }
            else if (isImportSpecifier(parent2) && parent2.name === node) {
                Debug.assertNode(node, isIdentifier, "Expected an identifier for spelling (import)");
                const importDeclaration = findAncestor(node, isImportDeclaration);
                const resolvedSourceFile = getResolvedSourceFileFromImportDeclaration(sourceFile, context, importDeclaration);
                if (resolvedSourceFile && resolvedSourceFile.symbol) {
                    suggestedSymbol = checker.getSuggestedSymbolForNonexistentModule(node, resolvedSourceFile.symbol);
                }
            }
            else if (isJsxAttribute(parent2) && parent2.name === node) {
                Debug.assertNode(node, isIdentifier, "Expected an identifier for JSX attribute");
                const tag = findAncestor(node, isJsxOpeningLikeElement);
                const props = checker.getContextualTypeForArgumentAtIndex(tag, 0);
                suggestedSymbol = checker.getSuggestedSymbolForNonexistentJSXAttribute(node, props);
            }
            else if (hasSyntacticModifier(parent2, 16384 /* Override */) && isClassElement(parent2) && parent2.name === node) {
                const baseDeclaration = findAncestor(node, isClassLike);
                const baseTypeNode = baseDeclaration ? getEffectiveBaseTypeNode(baseDeclaration) : void 0;
                const baseType = baseTypeNode ? checker.getTypeAtLocation(baseTypeNode) : void 0;
                if (baseType) {
                    suggestedSymbol = checker.getSuggestedSymbolForNonexistentClassMember(getTextOfNode(node), baseType);
                }
            }
            else {
                const meaning = getMeaningFromLocation(node);
                const name = getTextOfNode(node);
                Debug.assert(name !== void 0, "name should be defined");
                suggestedSymbol = checker.getSuggestedSymbolForNonexistentSymbol(node, name, convertSemanticMeaningToSymbolFlags(meaning));
            }
            return suggestedSymbol === void 0 ? void 0 : { node, suggestedSymbol };
        }