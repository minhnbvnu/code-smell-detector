function checkImportsForTypeOnlyConversion(sourceFile) {
                for (const statement of sourceFile.statements) {
                    if (canConvertImportDeclarationToTypeOnly(statement) || canConvertImportEqualsDeclarationToTypeOnly(statement)) {
                        error(statement, Diagnostics.This_import_is_never_used_as_a_value_and_must_use_import_type_because_importsNotUsedAsValues_is_set_to_error);
                    }
                }
            }