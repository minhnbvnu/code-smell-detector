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