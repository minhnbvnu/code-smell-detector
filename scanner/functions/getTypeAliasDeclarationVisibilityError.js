function getTypeAliasDeclarationVisibilityError(symbolAccessibilityResult) {
                return {
                    diagnosticMessage: symbolAccessibilityResult.errorModuleName ? Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2 : Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                    errorNode: isJSDocTypeAlias(node) ? Debug.checkDefined(node.typeExpression) : node.type,
                    typeName: isJSDocTypeAlias(node) ? getNameOfDeclaration(node) : node.name
                };
            }