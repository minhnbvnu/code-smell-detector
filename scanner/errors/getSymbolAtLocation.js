function getSymbolAtLocation(node, ignoreErrors) {
                if (isSourceFile(node)) {
                    return isExternalModule(node) ? getMergedSymbol(node.symbol) : void 0;
                }
                const { parent: parent2 } = node;
                const grandParent = parent2.parent;
                if (node.flags & 33554432 /* InWithStatement */) {
                    return void 0;
                }
                if (isDeclarationNameOrImportPropertyName(node)) {
                    const parentSymbol = getSymbolOfDeclaration(parent2);
                    return isImportOrExportSpecifier(node.parent) && node.parent.propertyName === node ? getImmediateAliasedSymbol(parentSymbol) : parentSymbol;
                }
                else if (isLiteralComputedPropertyDeclarationName(node)) {
                    return getSymbolOfDeclaration(parent2.parent);
                }
                if (node.kind === 79 /* Identifier */) {
                    if (isInRightSideOfImportOrExportAssignment(node)) {
                        return getSymbolOfNameOrPropertyAccessExpression(node);
                    }
                    else if (parent2.kind === 205 /* BindingElement */ && grandParent.kind === 203 /* ObjectBindingPattern */ && node === parent2.propertyName) {
                        const typeOfPattern = getTypeOfNode(grandParent);
                        const propertyDeclaration = getPropertyOfType(typeOfPattern, node.escapedText);
                        if (propertyDeclaration) {
                            return propertyDeclaration;
                        }
                    }
                    else if (isMetaProperty(parent2) && parent2.name === node) {
                        if (parent2.keywordToken === 103 /* NewKeyword */ && idText(node) === "target") {
                            return checkNewTargetMetaProperty(parent2).symbol;
                        }
                        if (parent2.keywordToken === 100 /* ImportKeyword */ && idText(node) === "meta") {
                            return getGlobalImportMetaExpressionType().members.get("meta");
                        }
                        return void 0;
                    }
                }
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                        if (!isThisInTypeQuery(node)) {
                            return getSymbolOfNameOrPropertyAccessExpression(node);
                        }
                    case 108 /* ThisKeyword */:
                        const container = getThisContainer(node, 
                        /*includeArrowFunctions*/
                        false, 
                        /*includeClassComputedPropertyName*/
                        false);
                        if (isFunctionLike(container)) {
                            const sig = getSignatureFromDeclaration(container);
                            if (sig.thisParameter) {
                                return sig.thisParameter;
                            }
                        }
                        if (isInExpressionContext(node)) {
                            return checkExpression(node).symbol;
                        }
                    case 194 /* ThisType */:
                        return getTypeFromThisTypeNode(node).symbol;
                    case 106 /* SuperKeyword */:
                        return checkExpression(node).symbol;
                    case 135 /* ConstructorKeyword */:
                        const constructorDeclaration = node.parent;
                        if (constructorDeclaration && constructorDeclaration.kind === 173 /* Constructor */) {
                            return constructorDeclaration.parent.symbol;
                        }
                        return void 0;
                    case 10 /* StringLiteral */:
                    case 14 /* NoSubstitutionTemplateLiteral */:
                        if (isExternalModuleImportEqualsDeclaration(node.parent.parent) && getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node || (node.parent.kind === 269 /* ImportDeclaration */ || node.parent.kind === 275 /* ExportDeclaration */) && node.parent.moduleSpecifier === node || (isInJSFile(node) && getEmitModuleResolutionKind(compilerOptions) !== 100 /* Bundler */ && isRequireCall(node.parent, 
                        /*checkArgumentIsStringLiteralLike*/
                        false) || isImportCall(node.parent)) || isLiteralTypeNode(node.parent) && isLiteralImportTypeNode(node.parent.parent) && node.parent.parent.argument === node.parent) {
                            return resolveExternalModuleName(node, node, ignoreErrors);
                        }
                        if (isCallExpression(parent2) && isBindableObjectDefinePropertyCall(parent2) && parent2.arguments[1] === node) {
                            return getSymbolOfDeclaration(parent2);
                        }
                    case 8 /* NumericLiteral */:
                        const objectType = isElementAccessExpression(parent2) ? parent2.argumentExpression === node ? getTypeOfExpression(parent2.expression) : void 0 : isLiteralTypeNode(parent2) && isIndexedAccessTypeNode(grandParent) ? getTypeFromTypeNode(grandParent.objectType) : void 0;
                        return objectType && getPropertyOfType(objectType, escapeLeadingUnderscores(node.text));
                    case 88 /* DefaultKeyword */:
                    case 98 /* FunctionKeyword */:
                    case 38 /* EqualsGreaterThanToken */:
                    case 84 /* ClassKeyword */:
                        return getSymbolOfNode(node.parent);
                    case 202 /* ImportType */:
                        return isLiteralImportTypeNode(node) ? getSymbolAtLocation(node.argument.literal, ignoreErrors) : void 0;
                    case 93 /* ExportKeyword */:
                        return isExportAssignment(node.parent) ? Debug.checkDefined(node.parent.symbol) : void 0;
                    case 100 /* ImportKeyword */:
                    case 103 /* NewKeyword */:
                        return isMetaProperty(node.parent) ? checkMetaPropertyKeyword(node.parent).symbol : void 0;
                    case 233 /* MetaProperty */:
                        return checkExpression(node).symbol;
                    default:
                        return void 0;
                }
            }