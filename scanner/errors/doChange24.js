function doChange24(changes, sourceFile, token, errorCode, program, cancellationToken, markSeen, host, preferences) {
            if (!isParameterPropertyModifier(token.kind) && token.kind !== 79 /* Identifier */ && token.kind !== 25 /* DotDotDotToken */ && token.kind !== 108 /* ThisKeyword */) {
                return void 0;
            }
            const { parent: parent2 } = token;
            const importAdder = createImportAdder(sourceFile, program, preferences, host);
            errorCode = mapSuggestionDiagnostic(errorCode);
            switch (errorCode) {
                case Diagnostics.Member_0_implicitly_has_an_1_type.code:
                case Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
                    if (isVariableDeclaration(parent2) && markSeen(parent2) || isPropertyDeclaration(parent2) || isPropertySignature(parent2)) {
                        annotateVariableDeclaration(changes, importAdder, sourceFile, parent2, program, host, cancellationToken);
                        importAdder.writeFixes(changes);
                        return parent2;
                    }
                    if (isPropertyAccessExpression(parent2)) {
                        const type = inferTypeForVariableFromUsage(parent2.name, program, cancellationToken);
                        const typeNode = getTypeNodeIfAccessible(type, parent2, program, host);
                        if (typeNode) {
                            const typeTag = factory.createJSDocTypeTag(
                            /*tagName*/
                            void 0, factory.createJSDocTypeExpression(typeNode), 
                            /*comment*/
                            void 0);
                            changes.addJSDocTags(sourceFile, cast(parent2.parent.parent, isExpressionStatement), [typeTag]);
                        }
                        importAdder.writeFixes(changes);
                        return parent2;
                    }
                    return void 0;
                case Diagnostics.Variable_0_implicitly_has_an_1_type.code: {
                    const symbol = program.getTypeChecker().getSymbolAtLocation(token);
                    if (symbol && symbol.valueDeclaration && isVariableDeclaration(symbol.valueDeclaration) && markSeen(symbol.valueDeclaration)) {
                        annotateVariableDeclaration(changes, importAdder, getSourceFileOfNode(symbol.valueDeclaration), symbol.valueDeclaration, program, host, cancellationToken);
                        importAdder.writeFixes(changes);
                        return symbol.valueDeclaration;
                    }
                    return void 0;
                }
            }
            const containingFunction = getContainingFunction(token);
            if (containingFunction === void 0) {
                return void 0;
            }
            let declaration;
            switch (errorCode) {
                case Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
                    if (isSetAccessorDeclaration(containingFunction)) {
                        annotateSetAccessor(changes, importAdder, sourceFile, containingFunction, program, host, cancellationToken);
                        declaration = containingFunction;
                        break;
                    }
                case Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
                    if (markSeen(containingFunction)) {
                        const param = cast(parent2, isParameter);
                        annotateParameters(changes, importAdder, sourceFile, param, containingFunction, program, host, cancellationToken);
                        declaration = param;
                    }
                    break;
                case Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code:
                case Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code:
                    if (isGetAccessorDeclaration(containingFunction) && isIdentifier(containingFunction.name)) {
                        annotate(changes, importAdder, sourceFile, containingFunction, inferTypeForVariableFromUsage(containingFunction.name, program, cancellationToken), program, host);
                        declaration = containingFunction;
                    }
                    break;
                case Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code:
                    if (isSetAccessorDeclaration(containingFunction)) {
                        annotateSetAccessor(changes, importAdder, sourceFile, containingFunction, program, host, cancellationToken);
                        declaration = containingFunction;
                    }
                    break;
                case Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
                    if (ts_textChanges_exports.isThisTypeAnnotatable(containingFunction) && markSeen(containingFunction)) {
                        annotateThis(changes, sourceFile, containingFunction, program, host, cancellationToken);
                        declaration = containingFunction;
                    }
                    break;
                default:
                    return Debug.fail(String(errorCode));
            }
            importAdder.writeFixes(changes);
            return declaration;
        }