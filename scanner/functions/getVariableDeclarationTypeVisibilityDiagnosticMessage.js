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