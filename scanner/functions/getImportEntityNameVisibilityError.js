function getImportEntityNameVisibilityError() {
                return {
                    diagnosticMessage: Diagnostics.Import_declaration_0_is_using_private_name_1,
                    errorNode: node,
                    typeName: node.name
                };
            }