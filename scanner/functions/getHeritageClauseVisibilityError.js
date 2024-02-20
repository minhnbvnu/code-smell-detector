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