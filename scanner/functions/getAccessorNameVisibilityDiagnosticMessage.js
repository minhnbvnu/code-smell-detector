function getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult) {
                if (isStatic(node)) {
                    return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                }
                else if (node.parent.kind === 260 /* ClassDeclaration */) {
                    return symbolAccessibilityResult.errorModuleName ? symbolAccessibilityResult.accessibility === 2 /* CannotBeNamed */ ? Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named : Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                }
                else {
                    return symbolAccessibilityResult.errorModuleName ? Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 : Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                }
            }