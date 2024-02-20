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