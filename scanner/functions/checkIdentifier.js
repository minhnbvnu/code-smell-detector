function checkIdentifier(node, checkMode) {
                if (isThisInTypeQuery(node)) {
                    return checkThisExpression(node);
                }
                const symbol = getResolvedSymbol(node);
                if (symbol === unknownSymbol) {
                    return errorType;
                }
                if (symbol === argumentsSymbol) {
                    if (isInPropertyInitializerOrClassStaticBlock(node)) {
                        error(node, Diagnostics.arguments_cannot_be_referenced_in_property_initializers);
                        return errorType;
                    }
                    const container = getContainingFunction(node);
                    if (languageVersion < 2 /* ES2015 */) {
                        if (container.kind === 216 /* ArrowFunction */) {
                            error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression);
                        }
                        else if (hasSyntacticModifier(container, 512 /* Async */)) {
                            error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_async_function_or_method_in_ES3_and_ES5_Consider_using_a_standard_function_or_method);
                        }
                    }
                    getNodeLinks(container).flags |= 512 /* CaptureArguments */;
                    return getTypeOfSymbol(symbol);
                }
                if (shouldMarkIdentifierAliasReferenced(node)) {
                    markAliasReferenced(symbol, node);
                }
                const localOrExportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                const targetSymbol = checkDeprecatedAliasedSymbol(localOrExportSymbol, node);
                if (isDeprecatedSymbol(targetSymbol) && isUncalledFunctionReference(node, targetSymbol) && targetSymbol.declarations) {
                    addDeprecatedSuggestion(node, targetSymbol.declarations, node.escapedText);
                }
                let declaration = localOrExportSymbol.valueDeclaration;
                if (declaration && localOrExportSymbol.flags & 32 /* Class */) {
                    if (declaration.kind === 260 /* ClassDeclaration */ && nodeIsDecorated(legacyDecorators, declaration)) {
                        let container = getContainingClass(node);
                        while (container !== void 0) {
                            if (container === declaration && container.name !== node) {
                                getNodeLinks(declaration).flags |= 1048576 /* ClassWithConstructorReference */;
                                getNodeLinks(node).flags |= 2097152 /* ConstructorReferenceInClass */;
                                break;
                            }
                            container = getContainingClass(container);
                        }
                    }
                    else if (declaration.kind === 228 /* ClassExpression */) {
                        let container = getThisContainer(node, 
                        /*includeArrowFunctions*/
                        false, 
                        /*includeClassComputedPropertyName*/
                        false);
                        while (container.kind !== 308 /* SourceFile */) {
                            if (container.parent === declaration) {
                                if (isPropertyDeclaration(container) && isStatic(container) || isClassStaticBlockDeclaration(container)) {
                                    getNodeLinks(declaration).flags |= 1048576 /* ClassWithConstructorReference */;
                                    getNodeLinks(node).flags |= 2097152 /* ConstructorReferenceInClass */;
                                }
                                break;
                            }
                            container = getThisContainer(container, 
                            /*includeArrowFunctions*/
                            false, 
                            /*includeClassComputedPropertyName*/
                            false);
                        }
                    }
                }
                checkNestedBlockScopedBinding(node, symbol);
                let type = getNarrowedTypeOfSymbol(localOrExportSymbol, node);
                const assignmentKind = getAssignmentTargetKind(node);
                if (assignmentKind) {
                    if (!(localOrExportSymbol.flags & 3 /* Variable */) && !(isInJSFile(node) && localOrExportSymbol.flags & 512 /* ValueModule */)) {
                        const assignmentError = localOrExportSymbol.flags & 384 /* Enum */ ? Diagnostics.Cannot_assign_to_0_because_it_is_an_enum : localOrExportSymbol.flags & 32 /* Class */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_class : localOrExportSymbol.flags & 1536 /* Module */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_namespace : localOrExportSymbol.flags & 16 /* Function */ ? Diagnostics.Cannot_assign_to_0_because_it_is_a_function : localOrExportSymbol.flags & 2097152 /* Alias */ ? Diagnostics.Cannot_assign_to_0_because_it_is_an_import : Diagnostics.Cannot_assign_to_0_because_it_is_not_a_variable;
                        error(node, assignmentError, symbolToString(symbol));
                        return errorType;
                    }
                    if (isReadonlySymbol(localOrExportSymbol)) {
                        if (localOrExportSymbol.flags & 3 /* Variable */) {
                            error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_constant, symbolToString(symbol));
                        }
                        else {
                            error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, symbolToString(symbol));
                        }
                        return errorType;
                    }
                }
                const isAlias = localOrExportSymbol.flags & 2097152 /* Alias */;
                if (localOrExportSymbol.flags & 3 /* Variable */) {
                    if (assignmentKind === 1 /* Definite */) {
                        return type;
                    }
                }
                else if (isAlias) {
                    declaration = getDeclarationOfAliasSymbol(symbol);
                }
                else {
                    return type;
                }
                if (!declaration) {
                    return type;
                }
                type = getNarrowableTypeForReference(type, node, checkMode);
                const isParameter2 = getRootDeclaration(declaration).kind === 166 /* Parameter */;
                const declarationContainer = getControlFlowContainer(declaration);
                let flowContainer = getControlFlowContainer(node);
                const isOuterVariable = flowContainer !== declarationContainer;
                const isSpreadDestructuringAssignmentTarget = node.parent && node.parent.parent && isSpreadAssignment(node.parent) && isDestructuringAssignmentTarget(node.parent.parent);
                const isModuleExports = symbol.flags & 134217728 /* ModuleExports */;
                while (flowContainer !== declarationContainer && (flowContainer.kind === 215 /* FunctionExpression */ || flowContainer.kind === 216 /* ArrowFunction */ || isObjectLiteralOrClassExpressionMethodOrAccessor(flowContainer)) && (isConstVariable(localOrExportSymbol) && type !== autoArrayType || isParameter2 && !isSymbolAssigned(localOrExportSymbol))) {
                    flowContainer = getControlFlowContainer(flowContainer);
                }
                const assumeInitialized = isParameter2 || isAlias || isOuterVariable || isSpreadDestructuringAssignmentTarget || isModuleExports || isSameScopedBindingElement(node, declaration) || type !== autoType && type !== autoArrayType && (!strictNullChecks || (type.flags & (3 /* AnyOrUnknown */ | 16384 /* Void */)) !== 0 || isInTypeQuery(node) || isInAmbientOrTypeNode(node) || node.parent.kind === 278 /* ExportSpecifier */) || node.parent.kind === 232 /* NonNullExpression */ || declaration.kind === 257 /* VariableDeclaration */ && declaration.exclamationToken || declaration.flags & 16777216 /* Ambient */;
                const initialType = assumeInitialized ? isParameter2 ? removeOptionalityFromDeclaredType(type, declaration) : type : type === autoType || type === autoArrayType ? undefinedType : getOptionalType(type);
                const flowType = getFlowTypeOfReference(node, type, initialType, flowContainer);
                if (!isEvolvingArrayOperationTarget(node) && (type === autoType || type === autoArrayType)) {
                    if (flowType === autoType || flowType === autoArrayType) {
                        if (noImplicitAny) {
                            error(getNameOfDeclaration(declaration), Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined, symbolToString(symbol), typeToString(flowType));
                            error(node, Diagnostics.Variable_0_implicitly_has_an_1_type, symbolToString(symbol), typeToString(flowType));
                        }
                        return convertAutoToAny(flowType);
                    }
                }
                else if (!assumeInitialized && !containsUndefinedType(type) && containsUndefinedType(flowType)) {
                    error(node, Diagnostics.Variable_0_is_used_before_being_assigned, symbolToString(symbol));
                    return type;
                }
                return assignmentKind ? getBaseTypeOfLiteralType(flowType) : flowType;
            }