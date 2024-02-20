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