function checkExternalImportOrExportDeclaration(node) {
                const moduleName = getExternalModuleName(node);
                if (!moduleName || nodeIsMissing(moduleName)) {
                    return false;
                }
                if (!isStringLiteral(moduleName)) {
                    error(moduleName, Diagnostics.String_literal_expected);
                    return false;
                }
                const inAmbientExternalModule = node.parent.kind === 265 /* ModuleBlock */ && isAmbientModule(node.parent.parent);
                if (node.parent.kind !== 308 /* SourceFile */ && !inAmbientExternalModule) {
                    error(moduleName, node.kind === 275 /* ExportDeclaration */ ? Diagnostics.Export_declarations_are_not_permitted_in_a_namespace : Diagnostics.Import_declarations_in_a_namespace_cannot_reference_a_module);
                    return false;
                }
                if (inAmbientExternalModule && isExternalModuleNameRelative(moduleName.text)) {
                    if (!isTopLevelInExternalModuleAugmentation(node)) {
                        error(node, Diagnostics.Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name);
                        return false;
                    }
                }
                if (!isImportEqualsDeclaration(node) && node.assertClause) {
                    let hasError = false;
                    for (const clause of node.assertClause.elements) {
                        if (!isStringLiteral(clause.value)) {
                            hasError = true;
                            error(clause.value, Diagnostics.Import_assertion_values_must_be_string_literal_expressions);
                        }
                    }
                    return !hasError;
                }
                return true;
            }