function createGetSymbolAccessibilityDiagnosticForNode(node) {
            if (isVariableDeclaration(node) || isPropertyDeclaration(node) || isPropertySignature(node) || isPropertyAccessExpression(node) || isBindingElement(node) || isConstructorDeclaration(node)) {
                return getVariableDeclarationTypeVisibilityError;
            }
            else if (isSetAccessor(node) || isGetAccessor(node)) {
                return getAccessorDeclarationTypeVisibilityError;
            }
            else if (isConstructSignatureDeclaration(node) || isCallSignatureDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isFunctionDeclaration(node) || isIndexSignatureDeclaration(node)) {
                return getReturnTypeVisibilityError;
            }
            else if (isParameter(node)) {
                if (isParameterPropertyDeclaration(node, node.parent) && hasSyntacticModifier(node.parent, 8 /* Private */)) {
                    return getVariableDeclarationTypeVisibilityError;
                }
                return getParameterDeclarationTypeVisibilityError;
            }
            else if (isTypeParameterDeclaration(node)) {
                return getTypeParameterConstraintVisibilityError;
            }
            else if (isExpressionWithTypeArguments(node)) {
                return getHeritageClauseVisibilityError;
            }
            else if (isImportEqualsDeclaration(node)) {
                return getImportEntityNameVisibilityError;
            }
            else if (isTypeAliasDeclaration(node) || isJSDocTypeAlias(node)) {
                return getTypeAliasDeclarationVisibilityError;
            }
            else {
                return Debug.assertNever(node, `Attempted to set a declaration diagnostic context for unhandled node kind: ${Debug.formatSyntaxKind(node.kind)}`);
            }
            function getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult) {
                if (node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */) {
                    return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                }
                else if (node.kind === 169 /* PropertyDeclaration */ || node.kind === 208 /* PropertyAccessExpression */ || node.kind === 168 /* PropertySignature */ || node.kind === 166 /* Parameter */ && hasSyntacticModifier(node.parent, 8 /* Private */)) {
                    if (isStatic(node)) {
                        return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else if (node.parent.kind === 260 /* ClassDeclaration */ || node.kind === 166 /* Parameter */) {
                        return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        return symbolAccessibilityResult.errorModuleName ? Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                    }
                }
            }
            function getVariableDeclarationTypeVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }
            function getAccessorDeclarationTypeVisibilityError(symbolAccessibilityResult) {
                let diagnosticMessage;
                if (node.kind === 175 /* SetAccessor */) {
                    if (isStatic(node)) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1;
                    }
                }
                else {
                    if (isStatic(node)) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1;
                    }
                }
                return {
                    diagnosticMessage,
                    errorNode: node.name,
                    typeName: node.name
                };
            }
            function getReturnTypeVisibilityError(symbolAccessibilityResult) {
                let diagnosticMessage;
                switch (node.kind) {
                    case 177 /* ConstructSignature */:
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;
                    case 176 /* CallSignature */:
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;
                    case 178 /* IndexSignature */:
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        if (isStatic(node)) {
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else if (node.parent.kind === 260 /* ClassDeclaration */) {
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else {
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ? Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                        }
                        break;
                    case 259 /* FunctionDeclaration */:
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named : Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1 : Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0;
                        break;
                    default:
                        return Debug.fail("This is unknown kind for signature: " + node.kind);
                }
                return {
                    diagnosticMessage,
                    errorNode: node.name || node
                };
            }
            function getParameterDeclarationTypeVisibilityError(symbolAccessibilityResult) {
                const diagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== void 0 ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : void 0;
            }
            function getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult) {
                switch (node.parent.kind) {
                    case 173 /* Constructor */:
                        return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;
                    case 177 /* ConstructSignature */:
                    case 182 /* ConstructorType */:
                        return symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                    case 176 /* CallSignature */:
                        return symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                    case 178 /* IndexSignature */:
                        return symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1;
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        if (isStatic(node.parent)) {
                            return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.parent.kind === 260 /* ClassDeclaration */) {
                            return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            return symbolAccessibilityResult.errorModuleName ? Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                        }
                    case 259 /* FunctionDeclaration */:
                    case 181 /* FunctionType */:
                        return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
                    case 175 /* SetAccessor */:
                    case 174 /* GetAccessor */:
                        return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Parameter_0_of_accessor_has_or_is_using_private_name_1;
                    default:
                        return Debug.fail(`Unknown parent for parameter: ${Debug.formatSyntaxKind(node.parent.kind)}`);
                }
            }
            function getTypeParameterConstraintVisibilityError() {
                let diagnosticMessage;
                switch (node.parent.kind) {
                    case 260 /* ClassDeclaration */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                        break;
                    case 261 /* InterfaceDeclaration */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case 197 /* MappedType */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1;
                        break;
                    case 182 /* ConstructorType */:
                    case 177 /* ConstructSignature */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case 176 /* CallSignature */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                        break;
                    case 171 /* MethodDeclaration */:
                    case 170 /* MethodSignature */:
                        if (isStatic(node.parent)) {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.parent.kind === 260 /* ClassDeclaration */) {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                        }
                        break;
                    case 181 /* FunctionType */:
                    case 259 /* FunctionDeclaration */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                        break;
                    case 192 /* InferType */:
                        diagnosticMessage = Diagnostics.Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1;
                        break;
                    case 262 /* TypeAliasDeclaration */:
                        diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
                        break;
                    default:
                        return Debug.fail("This is unknown parent for type parameter: " + node.parent.kind);
                }
                return {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                };
            }
            function getHeritageClauseVisibilityError() {
                let diagnosticMessage;
                if (isClassDeclaration(node.parent.parent)) {
                    diagnosticMessage = isHeritageClause(node.parent) && node.parent.token === 117 /* ImplementsKeyword */ ? Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 : node.parent.parent.name ? Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1 : Diagnostics.extends_clause_of_exported_class_has_or_is_using_private_name_0;
                }
                else {
                    diagnosticMessage = Diagnostics.extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                }
                return {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: getNameOfDeclaration(node.parent.parent)
                };
            }
            function getImportEntityNameVisibilityError() {
                return {
                    diagnosticMessage: Diagnostics.Import_declaration_0_is_using_private_name_1,
                    errorNode: node,
                    typeName: node.name
                };
            }
            function getTypeAliasDeclarationVisibilityError(symbolAccessibilityResult) {
                return {
                    diagnosticMessage: symbolAccessibilityResult.errorModuleName ? Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2 : Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                    errorNode: isJSDocTypeAlias(node) ? Debug.checkDefined(node.typeExpression) : node.type,
                    typeName: isJSDocTypeAlias(node) ? getNameOfDeclaration(node) : node.name
                };
            }
        }