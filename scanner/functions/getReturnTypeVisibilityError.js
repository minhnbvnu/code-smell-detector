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