function checkFunctionOrMethodDeclaration(node) {
                var _a2;
                checkDecorators(node);
                checkSignatureDeclaration(node);
                const functionFlags = getFunctionFlags(node);
                if (node.name && node.name.kind === 164 /* ComputedPropertyName */) {
                    checkComputedPropertyName(node.name);
                }
                if (hasBindableName(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    const localSymbol = node.localSymbol || symbol;
                    const firstDeclaration = (_a2 = localSymbol.declarations) == null ? void 0 : _a2.find(
                    // Get first non javascript function declaration
                    (declaration) => declaration.kind === node.kind && !(declaration.flags & 262144 /* JavaScriptFile */));
                    if (node === firstDeclaration) {
                        checkFunctionOrConstructorSymbol(localSymbol);
                    }
                    if (symbol.parent) {
                        checkFunctionOrConstructorSymbol(symbol);
                    }
                }
                const body = node.kind === 170 /* MethodSignature */ ? void 0 : node.body;
                checkSourceElement(body);
                checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, getReturnTypeFromAnnotation(node));
                addLazyDiagnostic(checkFunctionOrMethodDeclarationDiagnostics);
                if (isInJSFile(node)) {
                    const typeTag = getJSDocTypeTag(node);
                    if (typeTag && typeTag.typeExpression && !getContextualCallSignature(getTypeFromTypeNode(typeTag.typeExpression), node)) {
                        error(typeTag.typeExpression.type, Diagnostics.The_type_of_a_function_declaration_must_match_the_function_s_signature);
                    }
                }
                function checkFunctionOrMethodDeclarationDiagnostics() {
                    if (!getEffectiveReturnTypeNode(node)) {
                        if (nodeIsMissing(body) && !isPrivateWithinAmbient(node)) {
                            reportImplicitAny(node, anyType);
                        }
                        if (functionFlags & 1 /* Generator */ && nodeIsPresent(body)) {
                            getReturnTypeOfSignature(getSignatureFromDeclaration(node));
                        }
                    }
                }
            }